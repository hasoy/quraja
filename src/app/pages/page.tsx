import PagesTable from "@/components/PagesTable";
import Typography from "@/components/Typography";

const PageOverview: React.FC = () => {
  return (
    <main className="mx-auto w-4/6">
      <Typography tag="h1">Page overview</Typography>
      <Typography tag="p" className="whitespace-pre">
        {
          "View all your pages with their scores, mistakes and revisions. \nClick on a row to view and revise it again "
        }
      </Typography>
      <PagesTable />
    </main>
  );
};

export default PageOverview;
