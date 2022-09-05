import React from "react";
import Slider from "@mui/material/Slider";
import { Select, MenuItem, FormControl, Button, Typography } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import { useSelector } from "react-redux";
import Link from "next/link";
import {useRouter} from 'next/router'
function ShopFilters({  
  setFilters,
  brand_name = null,
}) {
  const router = useRouter()
  const minDistance = 5;
  const min_value = 0
  const max_value = 300
  const [value1, setValue1] = React.useState([min_value, max_value]);
  const [rateValue, setRateValue] = React.useState([1, 5]);
  const [values, setValues] = React.useState([]);
  const [selectedCountries, setSelectedCountries] = React.useState([]);
  const [accountType, setAccountType] = React.useState("all")
  const countries = useSelector((state) => state.main.countries);
  const categories = useSelector((state) => state.main.brands);

 

  const toggleCountry = (symbol) => {
    if (selectedCountries.includes(symbol)) {
      setSelectedCountries((c) => c.filter((i) => i !== symbol));
    } else {
      setSelectedCountries([...selectedCountries, symbol]);
    }
  };

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const handleRateChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setRateValue([Math.min(newValue[0], rateValue[1]), rateValue[1]]);
    } else {
      setRateValue([rateValue[0], Math.max(newValue[1], rateValue[0])]);
    }
  };

  function valuetext(value) {
    return `${value}`;
  }

  const handleMinPriceChange = (e) => {
    let val = e.target.value;
    setValue1([Math.min(val, value1[1] - minDistance), value1[1]]);
  };
  const handleMaxPriceChange = (e) => {
    let val = e.target.value;
    setValue1([value1[0], Math.max(val, value1[0] + minDistance)]);
  };

  const resetFilters = () => {
    setSelectedCountries([]);
    setValue1([0, max_value]);
    setRateValue([1, 5]);
    // router.push('/shop')
  };
  React.useEffect(() => {
    let a = [];
    for (let index = 1; index < 20; index += 1) {
      a.push(index);
    }
    for (let index = 20; index < 100; index +=5) {
      a.push(index);
    }
    for (let index = 100; index <= 300; index +=50) {
      a.push(index);
    }
    setValues(a);
  }, []);

  React.useEffect(() => {
    setFilters(s=>{return {
      ...s,
      rate: rateValue[0] +","+ rateValue[1],
    }})
  }, [rateValue]);

  React.useEffect(() => {
    
    setFilters(s=>{return {
      ...s,
      real_price: value1[0] +","+ value1[1],
    }})
  }, [value1]);

  React.useEffect(() => {
    setFilters(s=>{return {
      ...s,
      country: selectedCountries.join(','),
    }})
  }, [selectedCountries]);

  React.useEffect(() => {
    setFilters(s=>{return {
      ...s,
      accountType: accountType,
    }})
  }, [accountType]);

  return (
    <div>
      <p className="d-flex align-items-center justify-content-between m-0 mb-3 h-100 line-height-64">
        <span className="fs-4">فیلترها</span>
        <small
          className="text-danger fs-6 cursor-pointer"
          onClick={resetFilters}
        >
          پاک کردن همه
        </small>
      </p>
      <div className="product-list-gift ">
        <div className="filter filter-category">
          <span className="title">دسته بندی</span>
          <div className="d-flex flex-wrap  ">
            {categories.map((i, idx) => {
              return (
                <Link
                  key={idx}
                  component={"button"}
                  href={"/shop/" + i.slug_name}
                >
                  <a
                    className={
                      "btn-transparent category-item " +
                      (i.slug_name === brand_name ? "active" : "")
                    }
                  >
                    {/* <Typography sx={{fontSize: "11px"}}> */}
                    {i.persian_name}
                    {/* </Typography> */}
                  </a>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="filter filter-country">
          <span className="title d-block">نوع کارت</span>
          
            <div className="d-flex w-100">
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={accountType}
              onChange={e=>setAccountType(e.target.value)}
            >
              <FormControlLabel className="m-0" value="giftcard" control={<Radio />} label="گیفت کارت" />
              <FormControlLabel className="m-0" value="account" control={<Radio />} label="  اشتراک ماهیانه" />
              <FormControlLabel className="m-0" value="all" control={<Radio />} label="هردو" />
            </RadioGroup>
            
            </div>
        </div>
        
        <div className="filter filter-price mt-5">
          <span className="title">قیمت</span>
          <div className="drops d-flex align-items-center w-100">
            <FormControl sx={{ m: 1, flexGrow: 1 }}>
              <Select
                value={value1[0]}
                onChange={handleMinPriceChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{ padding: 0 }}
              >
                {values.length
                  ? values.map((i, idx) => {
                      return (
                        <MenuItem value={i} key={idx}>
                          {i}
                        </MenuItem>
                      );
                    })
                  : undefined}
              </Select>
            </FormControl>
            {" تا "}
            <FormControl sx={{ m: 1, flexGrow: 1 }}>
              <Select
                value={value1[1]}
                onChange={handleMaxPriceChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {values.length
                  ? values.map((i, idx) => {
                      return (
                        <MenuItem key={idx} value={i}>
                          {i}
                        </MenuItem>
                      );
                    })
                  : undefined}
              </Select>
            </FormControl>
          </div>
        </div>  
        <div className="filter filter-country">
          <span className="title">کشور</span>
          <div className="d-flex flex-wrap justify-content-start">
            {countries.map((i, idx) => {
              return (
                <button
                  key={idx}
                  onClick={(e) => toggleCountry(i.symbol)}
                  className={
                    "btn-transparent   " +
                    (selectedCountries.includes(i.symbol) ? "selected" : "")
                  }
                >
                  {i.name}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ShopFilters;
