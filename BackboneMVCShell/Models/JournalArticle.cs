using System;
using System.Linq;
using System.Web;

namespace BackboneMVCShell.Models
{
    public class JournalArticle
    {
        public string author { get; set; }
        public string title { get; set; }
        public string journal { get; set; }
        public int citations { get; set; }
        public DateTime publishedOn { get; set; }
    }
}