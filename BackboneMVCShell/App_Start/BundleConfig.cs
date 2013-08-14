using System.Web;
using System.Web.Optimization;

namespace BackboneMVCShell
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/js").Include(
                        "~/Scripts/jquery-1.8.2.js",
                        "~/Scripts/customscripts/underscore.js",
                        "~/Scripts/customscripts/backbone.js",
                        "~/Scripts/customscripts/mustache.js",
                        "~/Scripts/customscripts/filepathhelper.js",
                        "~/Scripts/customscripts/modal.js",
                        "~/Scripts/customscripts/profiles.js",
                        "~/Scripts/profileboot.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                        "~/Content/site.css",
                        "~/Content/customstyles/modal.css"));
        }
    }
}
