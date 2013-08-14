using System.Collections.Generic;

namespace BackboneMVC.Models
{
    public class Profile
    {
        public int id { get; set; }
        public string firstName { get; set; }
        public string middleName { get; set; }
        public string lastName { get; set; }
        public string suffix { get; set; }
        public string position { get; set; }
        public string organization { get; set; }
        public string email { get; set; }
        public int papersPublished { get; set; }
        public decimal hIndex { get; set; }
        public JournalArticle[] journalArticles { get; set; }
    }
}