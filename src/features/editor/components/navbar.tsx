'use client';

import { ChevronDown, Download, MousePointerClick, Redo2, Undo2 } from 'lucide-react';
import { BsCloudCheck, BsFileImage, BsFiletypeJpg, BsFiletypePng } from 'react-icons/bs';
import { CiFileOn } from 'react-icons/ci';
import { LuFileJson } from 'react-icons/lu';
import { useFilePicker } from 'use-file-picker';

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { UserButton } from '@/features/auth/components/user-button';
import type { ActiveTool, Editor } from '@/features/editor/types';

import { Logo } from './logo';

interface NavbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Navbar = ({ editor, activeTool, onChangeActiveTool }: NavbarProps) => {
  const { openFilePicker } = useFilePicker({
    accept: '.json',
    onFilesSuccessfullySelected: ({ plainFiles }: any) => {
      if (plainFiles && plainFiles.length > 0) {
        const file = plainFiles[0];
        const reader = new FileReader();

        reader.readAsText(file, 'UTF-8');
        reader.onload = () => {
          editor?.loadJSON(reader.result as string);
        };
      }
    },
  });

  return (
    <nav className="w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px]">
      <Logo />

      <div className="w-full flex items-center gap-x-1 h-full">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              File
              <ChevronDown className="size-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="min-w-60">
            <DropdownMenuItem onClick={openFilePicker} className="flex items-center gap-x-2">
              <CiFileOn className="size-8" />

              <div>
                <p>Open</p>
                <p className="text-xs text-muted-foreground">Open a JSON file.</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="mx-2" />

        <Hint label="Select" side="bottom" sideOffset={10}>
          <Button variant={activeTool === 'select' ? 'secondary' : 'ghost'} size="icon" onClick={() => onChangeActiveTool('select')}>
            <MousePointerClick className="size-4" />
          </Button>
        </Hint>

        <Hint label="Undo" side="bottom" sideOffset={10}>
          <Button disabled={!editor?.canUndo()} variant="ghost" size="icon" onClick={() => editor?.onUndo()}>
            <Undo2 className="size-4" />
          </Button>
        </Hint>

        <Hint label="Redo" side="bottom" sideOffset={10}>
          <Button disabled={!editor?.canRedo()} variant="ghost" size="icon" onClick={() => editor?.onRedo()}>
            <Redo2 className="size-4" />
          </Button>
        </Hint>

        <Separator orientation="vertical" className="mx-2" />

        <div className="flex items-center gap-x-2">
          <BsCloudCheck className="size-[20px] text-muted-foreground" />

          <p className="text-xs text-muted-foreground">Saved</p>
        </div>

        <div className="ml-auto flex items-center gap-x-4">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                Export
                <Download className="size-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="min-w-60">
              <DropdownMenuItem onClick={() => editor?.saveJSON()} className="flex items-center gap-x-2">
                <LuFileJson className="size-7 text-slate-700" />

                <div>
                  <p>JSON</p>
                  <p className="text-xs text-muted-foreground">Save for later editing</p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => editor?.savePNG()} className="flex items-center gap-x-2">
                <BsFiletypePng className="size-7 text-slate-700" />

                <div>
                  <p>PNG</p>
                  <p className="text-xs text-muted-foreground">Best for editing.</p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => editor?.saveJPG()} className="flex items-center gap-x-2">
                <BsFiletypeJpg className="size-7 text-slate-700" />

                <div>
                  <p>JPG</p>
                  <p className="text-xs text-muted-foreground">Best for printing.</p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => editor?.saveJPEG()} className="flex items-center gap-x-2">
                <BsFileImage className="size-7 text-slate-700" />

                <div>
                  <p>JPEG</p>
                  <p className="text-xs text-muted-foreground">Best for sharing on the web.</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <UserButton />
        </div>
      </div>
    </nav>
  );
};
