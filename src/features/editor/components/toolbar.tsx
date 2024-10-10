import { ArrowDown, ArrowUp } from 'lucide-react';
import { BsBorderWidth } from 'react-icons/bs';

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import type { ActiveTool, Editor } from '@/features/editor/types';
import { cn } from '@/lib/utils';

interface ToolbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Toolbar = ({ editor, activeTool, onChangeActiveTool }: ToolbarProps) => {
  const fillColor = editor?.getActiveFillColor();
  const strokeColor = editor?.getActiveStrokeColor();

  if (editor?.selectedObjects.length === 0) {
    return <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" />;
  }

  return (
    <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      <div className="flex items-center h-full justify-center">
        <Hint label="Color" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool('fill')}
            size="icon"
            variant="ghost"
            className={cn(activeTool === 'fill' && 'bg-gray-100')}
          >
            <div
              aria-hidden
              className="rounded-sm size-4 border"
              style={{
                backgroundColor: fillColor,
              }}
            />
          </Button>
        </Hint>
      </div>

      <div className="flex items-center h-full justify-center">
        <Hint label="Stroke Color" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool('stroke-color')}
            size="icon"
            variant="ghost"
            className={cn(activeTool === 'stroke-color' && 'bg-gray-100')}
          >
            <div
              aria-hidden
              className="rounded-sm size-4 border-2 bg-white"
              style={{
                borderColor: strokeColor,
              }}
            />
          </Button>
        </Hint>
      </div>

      <div className="flex items-center h-full justify-center">
        <Hint label="Stroke Width" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool('stroke-width')}
            size="icon"
            variant="ghost"
            className={cn(activeTool === 'stroke-width' && 'bg-gray-100')}
          >
            <BsBorderWidth className="size-4" />
          </Button>
        </Hint>
      </div>

      <div className="flex items-center h-full justify-center">
        <Hint label="Bring Forward" side="bottom" sideOffset={5}>
          <Button onClick={() => editor?.bringForward()} size="icon" variant="ghost">
            <ArrowUp className="size-4" />
          </Button>
        </Hint>
      </div>

      <div className="flex items-center h-full justify-center">
        <Hint label="Send Backwards" side="bottom" sideOffset={5}>
          <Button onClick={() => editor?.sendBackwards()} size="icon" variant="ghost">
            <ArrowDown className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};
