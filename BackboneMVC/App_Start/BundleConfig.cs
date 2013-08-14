using System.Web;
using System.Web.Optimization;

namespace BackboneMVC
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));

            // custom items
            bundles.Add(new ScriptBundle("~/bundles/custom").Include(
                        "~/Scripts/customscripts/underscore.js",
                        "~/Scripts/customscripts/backbone.js",
                        "~/Scripts/customscripts/mustache.js",
                        "~/Scripts/customscripts/filepathhelper.js",
                        "~/Scripts/customscripts/modal.js",
                        "~/Scripts/customscripts/profilemodal.js",
                        "~/Scripts/profiles.js"));

            bundles.Add(new StyleBundle("~/Content/custom").Include(
                        "~/Content/customstyles/modal.css"
                        ));
       
        }
    }
}