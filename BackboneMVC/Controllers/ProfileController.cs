using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using BackboneMVC.Models;

namespace BackboneMVC.Controllers
{
    public class ProfileController : ApiController
    {
        public IEnumerable<Profile> GetAllFacultys()
        {
            return DataFeed.Profiles;
        }

        public Profile GetFacultyById(int id)
        {
            var faculty = DataFeed.Profiles.FirstOrDefault(p => p.id == id);
            if (faculty == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return faculty;
        }
    }
}
