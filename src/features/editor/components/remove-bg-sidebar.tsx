import { AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRemoveBg } from '@/features/ai/api/use-remove-bg';
import { type ActiveTool, type Editor } from '@/features/editor/types';
import { cn } from '@/lib/utils';

import { ToolSidebarClose } from './tool-sidebar-close';
import { ToolSidebarHeader } from './tool-sidebar-header';

interface RemoveBgSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const RemoveBgSidebar = ({ editor, activeTool, onChangeActiveTool }: RemoveBgSidebarProps) => {
  const { mutate: removeBg, isPending: isRemovingBg } = useRemoveBg();

  const selectedObject = editor?.selectedObjects[0];

  // @ts-ignore original element attribute types aren't added.
  const imageSrc = selectedObject?._originalElement?.currentSrc;

  const onClose = () => onChangeActiveTool('select');

  const onRemove = () => {
    // TODO: Block with paywall

    removeBg(
      {
        image: imageSrc,
      },
      {
        onSuccess: ({ data }) => {
          editor?.addImage(data);
        },
        onError: (error) => {
          console.error(error);
          toast.error('Something went wrong!');
        },
      },
    );
  };

  return (
    <aside
      className={cn('bg-white relative border z-40 w-[360px] h-full flex flex-col', activeTool === 'remove-bg' ? 'visible' : 'hidden')}
    >
      <ToolSidebarHeader title="Background Removal" description="Remove background from image using AI." />

      {imageSrc ? (
        <ScrollArea>
          <div className="p-4 space-y-4">
            <div className={cn('relative aspect-square rounded-md overflow-hidden transition bg-muted', isRemovingBg && 'opacity-50')}>
              <Image src={imageSrc} alt="Selected image" fill className="object-cover" />
            </div>

            <Button disabled={isRemovingBg} onClick={onRemove} className="w-full">
              Remove background
            </Button>
          </div>
        </ScrollArea>
      ) : (
        <div className="flex flex-col gap-y-4 items-center justify-center flex-1">
          <AlertTriangle className="size-4 text-muted-foreground" />

          <p className="text-muted-foreground text-xs">Feature not available for this object.</p>
        </div>
      )}

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
