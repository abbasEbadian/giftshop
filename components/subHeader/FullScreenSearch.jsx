import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close'
import { InputBase } from '@mui/material';
import { useEffect } from 'react';
import { SEARCH_TERM } from '../../redux/endpoints';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import Link from 'next/link';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, setOpen }) {
  const [term, setTerm] = React.useState("")
  const [options, setOptions] = React.useState([])
  const [cardOptions, setCardOptions] = React.useState([])
  const [brandOptions, setBrandOptions] = React.useState([])

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    setCardOptions(options.filter(i => i.is_card))
    setBrandOptions(options.filter(i => !i.is_card))
  }, [options])

  useEffect(() => {
    if (term.length < 3) { setOptions([]); return; }
    fetch(SEARCH_TERM(term))
      .then(r => r.json())
      .then(data => {
        setOptions(data)
      })
      .catch(e => console.log(e))
  }, [term])
  return (

    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      className="search-dialog"
    >
      <div className='d-flex align-items-center justify-content-between px-2 py-4'>
        <h5>فیلتر محصولات</h5>
        <Button onClick={e => setOpen(false)}>
          <CloseIcon />
        </Button>
      </div>
      <hr className="mt-0" />
      <div className='mx-auto px-4 col-12 col-md-8 col-lg-6 col-xxl-4 d-flex flex-column'>
        <InputBase
          sx={{ flex: 1, width: 500 }}
          className={"border-bottom border-dark px-3 py-1 w-100 fs-4 "}
          placeholder="جستجوی گیفت کارت یا دسته‌بندی"
          inputProps={{ 'aria-label': '' }}
          value={term}
          onChange={({ target: { value } }) => setTerm(value)}
          fullWidth
        />
        <br />
        {term.length < 3 && <small className="mb-3 ">
          برای شروع حداقل 3 کاراکتر وارد کنید
        </small>}
        {term.length > 2 && !options.length && <small className="mb-3 ">
          محصولی با این مشخصات یافت نشد
        </small>}

        <ul class="list-group list-group-flush p-0 mb-3" >

          {
            brandOptions && brandOptions.map((option, idx) => {
              return <li key={idx} class="list-group-item " role="Button">
                <Link href={option.url}>
                  <a className='w-100 d-flex' onClick={e=>setOpen(false)}>
                    {option.full_name}
                    <ArrowBackIos fontSize='small' className="me-auto" htmlColor='#888' />
                  </a>
                </Link>
              </li>
            })
          }

        </ul>
        <ul class="list-group list-group-flush p-0" >

          {
            cardOptions && cardOptions.map((option, idx) => {
              return <li key={idx} class="list-group-item " role="Button">
                <Link href={option.url}>
                  <a className='w-100 d-flex' onClick={e=>setOpen(false)}>
                    {option.full_name}
                    <ArrowBackIos fontSize='small' className="me-auto" htmlColor='#888' />
                  </a>
                </Link>
              </li>
            })
          }

        </ul>



      </div>
    </Dialog >
  );
}