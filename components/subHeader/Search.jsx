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


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({setOpen=false}) {
 const [cats, setCats] = React.useState([])
 const [loading, setLoading] = React.useState([])
 const [searchValue, setSearchValue] = React.useState([])
 const router = useRouter()
    React.useEffect(()=>{
        setLoading(true)
        axios.get(e.SEARCH_OPTIONS)
        .then(response=>{
            const {data} = response
            setCats(data)
        })
        .catch(e=>console.log(e))
        .finally(e=>setLoading(false))
    }, [])

    const _search = ()=>{
        let base = "/shop/"
        if(!searchValue) return
        const brands = searchValue.filter(e=>e.group==="دسته بندی")
        const countries = searchValue.filter(e=>e.group==="کشور")
        const prices = searchValue.filter(e=>e.group==="قیمت")

        if (brands.length === 1)
            base += brands[0].title
        else if(brands.length > 1)
            base += "?brand_name=" +  brands.map(e=>e.title).join(",")

        
        if(prices.length>0){
            const p = base.indexOf("?")>-1?"&":"?"

            if(prices.length > 1)
                base += p+"real_price=" +  Math.min(...prices.map(e=>+e.title)) + "," + Math.max(...prices.map(e=>+e.title))
            else if (prices.length === 1)
                base += p+"real_price=" + +prices[0].title + "," + (+prices[0].title + 5)     
            
            
        }
        if(countries.length){
            const p = base.indexOf("?")>-1?"&":"?"
            base+= p+"country=" + countries.map(i=>i.title).join(",")
        }
        
        if(setOpen) setOpen(false)
       router.push(base)
    }

  return (
    <>
    
   <div className="d-flex align-items-center justify-content-center">
     
    <Autocomplete
        dir="ltr"
      multiple
      id="main-searchbox"
      options={cats.filter(i=>!searchValue.includes(i.title))}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      groupBy={e=>e.group}
      noOptionsText={"گزینه ای یافت نشد "}
      loading={loading}
      value={searchValue}
      onChange={(e, v)=>setSearchValue(v)}
      renderOption={(props, option, { selected }) => (
        <li {...props} className="px-2">
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} placeholder="قیمت ، کشور یا دسته بندی"  variant="standard"/>
      )}
    />
    <Button
        className='px-0'
        onClick={_search}
        >
        <SearchIcon  width="20"/>
    </Button></div>
    </>
  );
}

