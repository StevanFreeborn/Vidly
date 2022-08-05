using System.Web.Optimization;

namespace Vidly
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new Bundle("~/bundles/lib").Include(
                "~/Scripts/lib/jquery-{version}.js",
                "~/Scripts/lib/bootstrap.js",
                "~/Scripts/DataTables/jquery.dataTables.js",
                "~/Scripts/DataTables/dataTables.bootstrap5.js",
                "~/Scripts/DataTables/dataTables.responsive.js",
                "~/Scripts/DataTables/responsive.bootstrap5.js"));

            bundles.Add(new Bundle("~/bundles/jqueryval").Include(
                "~/Scripts/lib/jquery.validate*"));

            bundles.Add(new Bundle("~/bundles/modernizr").Include(
                "~/Scripts/lib/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/Bootstrap/bootstrap-lumen.css",
                "~/Content/DataTables/css/dataTables.bootstrap5.css",
                "~/Content/DataTables/css/responsive.bootstrap5.css",
                "~/Content/site.css"));
        }
    }
}
