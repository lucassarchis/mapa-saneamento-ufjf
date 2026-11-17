# Script para iniciar um servidor HTTP local simples no Windows
param (
    [int]$Port = 8080
)

$HostName = "http://localhost:$Port/"
$RootPath = $PSScriptRoot

Write-Host "=========================================================================" -ForegroundColor Cyan
Write-Host " Servidor Web Local - Mapa Interativo de Saneamento e Reuso (UFJF)" -ForegroundColor Yellow
Write-Host " Autora: Katryne Karla Dutra Lopes" -ForegroundColor Yellow
Write-Host "=========================================================================" -ForegroundColor Cyan
Write-Host "Diretório raiz: $RootPath"
Write-Host "Acesse no navegador: $HostName" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o servidor." -ForegroundColor Gray
Write-Host ""

Start-Process $HostName

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($HostName)

try {
    $listener.Start()
} catch {
    Write-Warning "Não foi possível abrir na porta $Port. Abrindo o arquivo diretamente..."
    Start-Process "$RootPath\index.html"
    exit
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($urlPath)) {
            $urlPath = "index.html"
        }

        $filePath = Join-Path $RootPath $urlPath

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            $response.ContentType = $mime

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }
        $response.OutputStream.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
