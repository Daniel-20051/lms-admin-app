import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Badge } from "@/Components/ui/badge";
import { Card, CardContent } from "@/Components/ui/card";

interface Unit {
  id: number;
  title: string;
  content: string;
  content_type: string;
  video_url?: string;
}

interface UnitPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  unit: Unit;
}

export default function UnitPreviewDialog({
  open,
  onOpenChange,
  unit,
}: UnitPreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <DialogTitle className="text-2xl">{unit.title}</DialogTitle>
            <Badge variant="outline" className="capitalize">
              {unit.content_type}
            </Badge>
          </div>
        </DialogHeader>
        <div className="space-y-4">
          {unit.video_url && (
            <Card>
              <CardContent className="p-4">
                <video
                  src={unit.video_url}
                  controls
                  className="w-full rounded-lg"
                  style={{ maxHeight: "400px" }}
                >
                  Your browser does not support the video tag.
                </video>
              </CardContent>
            </Card>
          )}
          <Card>
            <CardContent className="p-6">
              <div
                className="prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: unit.content }}
              />
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

