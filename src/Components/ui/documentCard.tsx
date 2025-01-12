import { FileIcon, ExternalLinkIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
// import { TabsContent } from "@/Components/ui/tabs";
import { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { format } from 'date-fns';


interface Document {
  title: string;
  description: string;
  documentUrl: string;
  updatedAt: string;
}

function DocumentCard({ document }: { document: Document }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <FileIcon className="mr-2" />
            {document.title}
          </span>
          <Button variant="ghost" size="sm" onClick={() => window.open(document.documentUrl, '_blank')}>
            <ExternalLinkIcon className="mr-2" />
            Open
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-2">{document.description}</p>
        <p className="text-xs text-gray-400">
          Last updated: {format(new Date(document.updatedAt), 'PPP')}
        </p>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="mt-2">
              Preview
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{document.title}</DialogTitle>
            </DialogHeader>
            <div className="aspect-video">
              <iframe
                src={document.documentUrl}
                title={document.title}
                width="100%"
                height="100%"
                className="border-0"
              />
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default DocumentCard;