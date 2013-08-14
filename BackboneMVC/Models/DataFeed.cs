using System;

namespace BackboneMVC.Models
{
    public class DataFeed
    {
        public static Profile[] Profiles =
        {
            new Profile
            {
                id = 1,
                firstName = "John ",
                middleName = "",
                lastName = "Doe",
                suffix = "Ph.D.",
                position = "Assistant Professor",
                organization = "Thomson Reuters University",
                email = "jdoe@email.com",
                papersPublished = 15,
                hIndex = (decimal) 6.0,
                journalArticles =
                    new JournalArticle[2]
                    {
                        new JournalArticle
                        {
                            author = "John Doe, Greene B",
                            journal = "Science",
                            title = "Resilience psychology in individual, clinical and public health contexts.",
                            citations = 127,
                            publishedOn = new DateTime(2010, 1, 31)
                        },
                         new JournalArticle
                        {
                            author = "John Doe, Greene B",
                            journal = "Science",
                            title = "Adult resilience training for health psychology in individual, clinical and public health contexts.",
                            citations = 47,
                            publishedOn = new DateTime(2013, 1, 31)
                        }
                    }
            },
            new Profile
            {
                id = 2,
                firstName = "Joe",
                middleName = "",
                lastName = "Smith",
                suffix = "Ph.D.",
                position = "Assistant Professor",
                organization = "Thomson Reuters University",
                email = "jsmith@email.com",
                papersPublished = 3,
                hIndex = (decimal) 23.4,
                journalArticles =
                    new JournalArticle[]
                    {
                        new JournalArticle
                        {
                            author = "Joe Smith, Greene Brian",
                            journal = "Nature",
                            title = "Joes's greatest work",
                            publishedOn = new DateTime(2012, 1, 31)
                        },
                        new JournalArticle
                        {
                            author = "Joe Smith",
                            journal = "Nature",
                            title = "Joes's first work",
                            publishedOn = new DateTime(2012, 1, 31)
                        }
                    }
            },
            new Profile
            {
                id = 3,
                firstName = "Jim",
                middleName = "",
                lastName = "White",
                suffix = "Ph.D.",
                position = "Assistant Professor",
                organization = "Thomson Reuters University",
                email = "jsmith@email.com",
                papersPublished = 24,
                hIndex = (decimal) 3.5,
                journalArticles = null
            }
        };
    }
}