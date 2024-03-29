import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios'
import * as e from '../../redux/endpoints'
import Link from 'next/link'
import Router, { useRouter } from 'next/router';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { InputBase } from '@mui/material';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({ setOpen, setFull=()=>{} }) {
  const [cats, setCats] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState([])
  const router = useRouter()

  React.useEffect(() => {
    setLoading(true)
    axios.get(e.SEARCH_OPTIONS)
      .then(response => {
        const { data } = response
        setCats(data)
      })
      .catch(e => console.log(e))
      .finally(e => setLoading(false))
  }, [])

  const _search = () => {
    let base = "/shop/"
    if (!searchValue) return
    const brands = searchValue.filter(e => e.group === "دسته بندی")
    const countries = searchValue.filter(e => e.group === "کشور")
    const prices = searchValue.filter(e => e.group === "قیمت")

    if (brands.length === 1)
      base += brands[0].title
    else if (brands.length > 1)
      base += "?brand_name=" + brands.map(e => e.title).join(",")


    if (prices.length > 0) {
      const p = base.indexOf("?") > -1 ? "&" : "?"

      if (prices.length > 1)
        base += p + "real_price=" + Math.min(...prices.map(e => +e.title)) + "," + Math.max(...prices.map(e => +e.title))
      else if (prices.length === 1)
        base += p + "real_price=" + +prices[0].title + "," + (+prices[0].title + 5)


    }
    if (countries.length) {
      const p = base.indexOf("?") > -1 ? "&" : "?"
      base += p + "country=" + countries.map(i => i.title).join(",")
    }

    if (setOpen) setOpen(false)
    router.push(base)
  }
  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: (option) => option.title + " " + option.persian_name,
  });
  return (
    <>

      <div className="d-flex align-items-center justify-content-center">

        {/* <Autocomplete
          dir="ltr"
          multiple
          id="main-searchbox"
          options={cats.filter(i => !searchValue || !searchValue.includes(i.persian_name) )}
          disableCloseOnSelect
          getOptionLabel={(option) => option.title}
          groupBy={e => e.group}
          noOptionsText={"گزینه ای یافت نشد "}
          loading={loading}
          value={searchValue}
          onChange={(e, v) => setSearchValue(v)}
          filterOptions={filterOptions}
          renderOption={(props, option, { selected }) => (
            <li {...props} className="px-2">
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.persian_name ? option.persian_name : option.title}
            </li>
          )}
          sx={{ width: 500 }}
          renderInput={(params) => (
            <TextField {...params} placeholder="قیمت ، کشور یا دسته بندی" variant="standard" />
          )}
        /> */}
        <InputBase
            sx={{ ml: 1, flex: 1, width: 350}}
            placeholder="جستجوی کارت، دسته‌‌بندی، کشور..."
            inputProps={{ 'aria-label': '' }}
            onClick={ e=> {setFull(1) ; setOpen(false)}}
            className={"border rounded-pill py-1 px-2"}
            value={""}
            onChange={e=>setFull(1)}
        />
        {/* <Button
          className='px-0'
          onClick={_search}
          aria-label='جستجو'
        >
          <SearchIcon width="20" />
        </Button> */}
        </div>
    </>
  );
}