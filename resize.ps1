param($dir)
Add-Type -AssemblyName System.Drawing

$files = Get-ChildItem -Path $dir -Filter "*.jpg"

foreach ($file in $files) {
    try {
        $img = [System.Drawing.Image]::FromFile($file.FullName)
        $w = $img.Width
        $h = $img.Height
        
        if ($w -gt 800 -or $h -gt 800) {
            $ratio = 800.0 / [Math]::Max($w, $h)
            $newW = [int]($w * $ratio)
            $newH = [int]($h * $ratio)
            
            $newImg = New-Object System.Drawing.Bitmap($newW, $newH)
            $graph = [System.Drawing.Graphics]::FromImage($newImg)
            $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graph.DrawImage($img, 0, 0, $newW, $newH)
            $graph.Dispose()
            $img.Dispose()
            
            $file.Delete()
            
            # Save as JPEG
            $newImg.Save($file.FullName, [System.Drawing.Imaging.ImageFormat]::Jpeg)
            $newImg.Dispose()
            
            Write-Host "Resized $($file.Name)"
        } else {
            $img.Dispose()
        }
    } catch {
        Write-Host "Failed to resize $($file.Name): $_"
    }
}
