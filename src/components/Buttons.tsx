import { Pencil, Copy, Check, Trash2 } from 'lucide-react';

type Copy = {
  title: string;
  text: string;
};

type Buttons = {
  handleEdit: (e: React.MouseEvent) => void;
  copy: ({ title, text }: Copy) => Promise<void>;
  title: string;
  text: string;
  isCopied: boolean;
  handleDelete: () => void;
};

const Buttons = ({
  handleEdit,
  copy,
  title,
  text,
  isCopied,
  handleDelete,
}: Buttons) => {
  return (
    <div className="absolute bottom-3 inset-x-0 flex justify-center gap-6 transition-all duration-200 lg:opacity-0 lg:group-hover:opacity-100 lg:focus-within:opacity-100 lg:gap-2 lg:inset-x-[unset] lg:right-2 lg:bottom-2.75">
      <button className="cursor-pointer" onClick={(e) => handleEdit(e)}>
        <Pencil className="w-8 h-8 lg:w-4 lg:h-4" />
      </button>
      <button
        className="cursor-pointer"
        onClick={(e) => {
          copy({ title, text });
          e.currentTarget.blur();
        }}
      >
        {!isCopied ? (
          <Copy className="w-8 h-8 lg:w-4 lg:h-4" />
        ) : (
          <Check className="w-8 h-8 lg:w-4 lg:h-4" />
        )}
      </button>
      <button className="cursor-pointer" onClick={handleDelete}>
        <Trash2 className="w-8 h-8 lg:w-4 lg:h-4" />
      </button>
    </div>
  );
};

export default Buttons;
