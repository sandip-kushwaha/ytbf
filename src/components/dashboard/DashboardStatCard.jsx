import {
  FileText,
  CheckCircle,
  FileEdit,
  Folder,
  Eye,
  Star,
} from "lucide-react";

const icons = {
  news: FileText,
  published: CheckCircle,
  draft: FileEdit,
  categories: Folder,
  views: Eye,
  featured: Star,
};

const DashboardStatCard = ({ title, value, type, description }) => {
  const Icon = icons[type] || FileText;

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>

          <h3 className="mt-2 text-3xl font-bold text-white">{value}</h3>

          {description && (
            <p className="mt-1 text-xs text-gray-500">{description}</p>
          )}
        </div>

        <div className="grid h-12 w-12 place-items-center rounded-xl bg-gray-800">
          <Icon size={22} className="text-blue-400" />
        </div>
      </div>
    </div>
  );
};

export default DashboardStatCard;
