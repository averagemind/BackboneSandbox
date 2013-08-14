using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using BackboneMVCShell.Models;

namespace BackboneMVCShell.Controllers
{
    public class ProfilesController : ApiController
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