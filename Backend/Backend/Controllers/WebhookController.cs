using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.IO;
using System;
using System.Text.Json;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    // Handles /webhook requests that sort characters from an input string.
    [Route("webhook")]
    public class WebhookController : ControllerBase
    {
        // Accepts JSON or form data with a "data" field and returns sorted characters.
        [HttpPost]
        [Consumes("application/json")]
        public IActionResult PostJson([FromBody] SortRequest? json)
        {
            var input = json?.Data;
            return SortAndReturn(input);
        }

        [HttpPost]
        [Consumes("application/x-www-form-urlencoded")]
        public IActionResult PostForm([FromForm] string? data)
        {
            return SortAndReturn(data);
        }

        private IActionResult SortAndReturn(string? input)
        {
            if (string.IsNullOrWhiteSpace(input))
            {
                return BadRequest(new { error = "Missing 'data' string in request body" });
            }

            var normalized = input.ToLowerInvariant();
            var chars = normalized.ToCharArray();
            Array.Sort(chars);
            var result = chars.Select(c => c.ToString()).ToArray();

            return Ok(new { word = result });
        }

        [HttpPost("echo")]
        public IActionResult Echo()
        {
            // Simple health check
            return Ok(new { ok = true });
        }
    }
}

