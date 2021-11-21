// Please update this type as same as with the data shape.
type File = {
  id: string;
  name: string;
};

type Folder = {
  id: string;
  name: string;
  files: File[];
};

type List = Folder[];

let sourceFile: File;
let destinationIndex: number;

export default function move(list: List, source: string, destination: string): List {
  list.map((item: Folder) => {
    if (item.id === source) throw new Error('You cannot move a folder');
    item.files.map((file: File, index: number) => {
      if (file.id === source) {
        sourceFile = file;
        item.files.splice(index, 1);
      }
      return null;
    });
    return null;
  });

  destinationIndex = list.findIndex((item) => item.id === destination);
  if (destinationIndex < 0) {
    throw new Error('You cannot specify a file as the destination');
  }
  if (list[destinationIndex].files.findIndex((item) => item.name === sourceFile.name) >= 0) {
    throw new Error('You cannot move two files with the same name into the same folder.');
  }
  list[destinationIndex].files.push(sourceFile);
  return list;
}

const list = [
  {
    id: '1',
    name: 'Folder 1',
    files: [
      { id: '2', name: 'File 1' },
      { id: '3', name: 'File 2' },
      { id: '4', name: 'File 3' },
      { id: '5', name: 'File 4' },
    ],
  },
  {
    id: '6',
    name: 'Folder 2',
    files: [{ id: '7', name: 'File 5' }],
  },
];

move(list, '4', '6');
