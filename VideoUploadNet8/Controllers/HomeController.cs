using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using VideoUploadNet8.Models;
using System.IO;

namespace VideoUploadNet8.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly string _mediaPath;
        public HomeController(ILogger<HomeController> logger, IWebHostEnvironment env)
        {
            _logger = logger;
            _mediaPath = Path.Combine(env.WebRootPath, "media");
            if (!Directory.Exists(_mediaPath))
                Directory.CreateDirectory(_mediaPath);
        }

        public IActionResult Index()
        {
            var files = Directory.GetFiles(_mediaPath, "*.mp4")
            .Select(path => new FileInfo(path))
            .Select(file => new VideoFile
            {
                FileName = file.Name,
                FileSize = file.Length
            })
            .ToList();

            return View(files);
        }
      
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
