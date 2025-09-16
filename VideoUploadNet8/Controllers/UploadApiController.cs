using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class UploadApiController : ControllerBase
{
    private readonly IWebHostEnvironment _env;

    public UploadApiController(IWebHostEnvironment env)
    {
        _env = env;
    }

    [HttpPost]
    [RequestSizeLimit(200 * 1024 * 1024)] // 200MB limit
    public async Task<IActionResult> UploadFiles(List<IFormFile> files)
    {
        var mediaPath = Path.Combine(_env.WebRootPath, "media");

        if (!Directory.Exists(mediaPath))
            Directory.CreateDirectory(mediaPath);

        foreach (var file in files)
        {
            // Validate extension
            var ext = Path.GetExtension(file.FileName);
            if (!string.Equals(ext, ".mp4", StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest("Only .mp4 files are allowed.");
            }

            // Rename with timestamp or GUID
            var newFileName = $"{Path.GetFileNameWithoutExtension(file.FileName)}_{Guid.NewGuid()}{ext}";
            var fullPath = Path.Combine(mediaPath, newFileName);

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
        }

        return Ok("Files uploaded and renamed successfully.");
    }
}