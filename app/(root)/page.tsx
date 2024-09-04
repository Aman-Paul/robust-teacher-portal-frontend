import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@/components/ui/button';
import { IoMdArrowDropdownCircle } from "react-icons/io";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CiUser } from 'react-icons/ci';
import { BiMessageMinus } from "react-icons/bi";
import { PiBookmarkSimpleLight } from "react-icons/pi";


function createData(
  name: string,
  subject: string,
  marks: number,
) {
  return { name, subject, marks };
}

const rows = [
  createData('Frozen yoghurt', "159", 6.0),
  createData('Ice cream sandwich', "237", 9.0),
  createData('Eclair', "262", 16.0),
  createData('Cupcake', "305", 3.7),
  createData('Gingerbread', "356", 16.0),
];

export default function Home() {
  return (
    <div className='w-10/12 m-10'>
      <TableContainer component={Paper}  className='container'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Subject</TableCell>
              <TableCell align="right">Marks</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row?.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.name}
                </TableCell>
                <TableCell align="right">{row?.subject}</TableCell>
                <TableCell align="right">{row?.marks}</TableCell>
                <TableCell align='right'>
                  <Popover>
                    <PopoverTrigger><IoMdArrowDropdownCircle fontSize={14} /></PopoverTrigger>
                    <PopoverContent className='w-[100px] p-0'>
                      <div className="actions">
                        <ul>
                          <li>Edit</li>
                          <li>Delete</li>
                        </ul>
                      </div>
                    </PopoverContent>
                  </Popover>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog>
        <DialogTrigger>
          <Button type="button" className='min-w-52 min-h-12 rounded-sm items-center submit-btn mt-10'>Add</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-sm:max-w-[80vw] bg-white max-w-12">
        <div className="grid gap-2 py-4">
          <div className="grid grid-cols-4 items-center gap-2 flex-col-start my-2">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder='Name'
              className="col-span-3 w-[100%]"
              leftIcon={<CiUser className='mr-[10px]'/>}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-2 flex-col-start my-2">
            <Label htmlFor="name" className="text-right">
              Subject
            </Label>
            <Input
              id="subject"
              placeholder='Subject'
              className="col-span-3 w-[100%]"
              leftIcon={<BiMessageMinus className='mr-[10px]'/>}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-2 flex-col-start my-2">
            <Label htmlFor="name" className="text-right">
              Marks
            </Label>
            <Input
              id="marks"
              placeholder='Marks'
              className="col-span-3 w-[100%]"
              leftIcon={<PiBookmarkSimpleLight className='mr-[10px]'/>}
            />
          </div>
        </div>
        <div className='flex justify-center items-center w-[100%] '>
          <Button type="submit" className='min-w-40 rounded-sm items-center submit-btn '>Add student</Button>
        </div>
      </DialogContent>
      </Dialog>

    </div>
  );
}
