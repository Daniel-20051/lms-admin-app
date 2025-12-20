import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { ExternalLink, FileText, Image as ImageIcon } from "lucide-react";
import type { ApprovedKYCStudent } from "@/api/admin";

interface ViewApprovedDocumentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: ApprovedKYCStudent | null;
}

export default function ViewApprovedDocumentsDialog({
  open,
  onOpenChange,
  student,
}: ViewApprovedDocumentsDialogProps) {
  if (!student) return null;

  const getDocumentTypeLabel = (key: string) => {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const isImage = (url: string) => {
    if (!url) return false;
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url) || url.includes('storage.supabase.co');
  };

  const isFullUrl = (url: string) => {
    return url.startsWith('http://') || url.startsWith('https://');
  };

  const getDocumentUrl = (url: string) => {
    if (isFullUrl(url)) {
      return url;
    }
    // If it's just a filename, you might need to construct the full URL
    // For now, return as is - the backend should handle it
    return url;
  };

  const approvedDocuments = student.approved_documents || {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Approved Documents</DialogTitle>
          <DialogDescription>
            View all approved documents for {student.name}
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Student Information */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">Student Name</p>
              <p className="font-medium">{student.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{student.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Matric Number</p>
              <p className="font-medium">{student.matric_number}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Documents Count</p>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {student.documents_count} {student.documents_count === 1 ? 'Document' : 'Documents'}
              </Badge>
            </div>
          </div>

          {/* Documents List */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Approved Documents</h3>
            {Object.keys(approvedDocuments).length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-2" />
                <p>No approved documents available.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {Object.entries(approvedDocuments).map(([docType, url]) => {
                  const documentUrl = getDocumentUrl(url);
                  const isImageFile = isImage(documentUrl);
                  const hasValidUrl = isFullUrl(documentUrl);

                  return (
                    <div
                      key={docType}
                      className="border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {isImageFile ? (
                              <ImageIcon className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <FileText className="h-4 w-4 text-muted-foreground" />
                            )}
                            <h4 className="font-medium">{getDocumentTypeLabel(docType)}</h4>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              Approved
                            </Badge>
                          </div>

                          {/* Document Preview or Link */}
                          {hasValidUrl ? (
                            <div className="space-y-2">
                              {isImageFile ? (
                                <div className="space-y-2">
                                  <img
                                    src={documentUrl}
                                    alt={getDocumentTypeLabel(docType)}
                                    className="max-w-xs h-auto rounded-lg border cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={() => window.open(documentUrl, "_blank")}
                                  />
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(documentUrl, "_blank")}
                                  >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Open in New Tab
                                  </Button>
                                </div>
                              ) : (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => window.open(documentUrl, "_blank")}
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View Document
                                </Button>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">
                                {url || "Document URL not available"}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

       
      </DialogContent>
    </Dialog>
  );
}

