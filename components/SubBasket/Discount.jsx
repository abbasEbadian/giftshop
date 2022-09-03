import React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import axios from 'axios'
import { get_cart } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import * as e from '../../redux/endpoints'
import { toast } from 'react-toastify'
function Discount() {
  const dispatch = useDispatch()
  const [code, setCode] = React.useState("")
  const _submit = () => {
    axios.post(e.APPLY_CODE, { code })
      .then(response => {
        const { data } = response
        toast(data.message, { type: data.type })
        if (data.error === 0) {
          dispatch(get_cart())
        }
      })
      .catch(e => {
        console.log(e)
        toast.error('خطا در برقراری ارتباط')
      })
  }

  return (
    <FormControl sx={{ my: 1, width: '35%s', marginRight: "auto" }} variant="outlined" className="col-12 col-lg-6">
      <OutlinedInput
        dir="ltr"

        id="outlined-adornment-weight"
        value={code}
        onChange={e => setCode(e.target.value)}
        endAdornment={<InputAdornment className="text-black-50" position="start">کد تخفیف دارید ؟ وارد کنید</InputAdornment>}
        aria-describedby="outlined-weight-helper-text"
        inputProps={{
          'aria-label': 'weight',
        }}
      />
      <Button size="small" variant='contained' onClick={_submit} disabled={!code}>اعمال</Button>
    </FormControl>
  )
}

export default Discount