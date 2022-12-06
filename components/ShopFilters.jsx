import React, { useMemo, useRef } from "react";
import { Select, MenuItem, FormControl, Typography } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import Link from "next/link";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useRouter } from "next/router";
import { ChevronLeft } from "@mui/icons-material";

function ShopFilters({
  brand_name = null,
  brand = {},
  subbrand = null
}) {
  const router = useRouter()
  const minDistance = 5;
  const min_value = 1
  const max_value = 1000
  const [value1, setValue1] = React.useState([min_value, max_value]);
  const [accountType, setAccountType] = React.useState("all")

  const brand_set = useMemo(() => {
    const b =  brand?.brand_set || []
    if(subbrand && Object.keys(subbrand).length > 0) {
      console.log(subbrand ,  Object.keys(subbrand).length > 0)
      return b.filter(brand => brand.country_id.id !== subbrand?.country_id?.id)
    }
    return b
  }, [brand, subbrand])


  const navigate = (href, options) => {
    const { slug, ...query } = router.query
    href = href.split("?")[0]
    router.push({
      pathname: href,
      query: {
        ...query,
        ...options
      }
    })
  }

  const categories = React.useRef([
    {
      "id": 22,
      "name": "apple",
      "persian_name": "اپل"
    },
    {
      "id": 24,
      "name": "googleplay",
      "persian_name": "گوگل پلی"
    },
    {
      "id": 25,
      "name": "playstation",
      "persian_name": "پلی استیشن"
    },
    {
      "id": 26,
      "name": "steam",
      "persian_name": "استیم"
    },
    {
      "id": 27,
      "name": "xbox",
      "persian_name": "ایکس باکس"
    },
    {
      "id": 28,
      "name": "amazon",
      "persian_name": "امازون"
    },
    {
      "id": 29,
      "name": "spotify",
      "persian_name": "اسپاتیفای"
    },
    {
      "id": 30,
      "name": "netflix",
      "persian_name": "نتفلیکس"
    },
    {
      "id": 31,
      "name": "applemusic",
      "persian_name": "اپل موزیک"
    },
    {
      "id": 32,
      "name": "skype",
      "persian_name": "اسکایپ"
    },
    {
      "id": 33,
      "name": "nintendo",
      "persian_name": "نینتندو"
    },
    {
      "id": 34,
      "name": "roblex",
      "persian_name": "روبلاکس"
    },
    {
      "id": 35,
      "name": "leagueoflegends",
      "persian_name": "لیگ اف لجندز"
    },
    {
      "id": 36,
      "name": "blizard",
      "persian_name": "بلیزارد"
    },
    {
      "id": 37,
      "name": "warcraft",
      "persian_name": "وارکرفت"
    },
    {
      "id": 38,
      "name": "visacard",
      "persian_name": "ویزا کارت"
    },
    {
      "id": 39,
      "name": "mastercard",
      "persian_name": "مستر کارت"
    },
    {
      "id": 40,
      "name": "razergold",
      "persian_name": "ریزر گلد"
    },
    {
      "id": 42,
      "name": "apex",
      "persian_name": "اپکس"
    },
    {
      "id": 43,
      "name": "pubg",
      "persian_name": "پابجی"
    }
  ])

  const handleAccount = (type) => {
    setAccountType(type)
    navigate(router.asPath, {
      accountType: type
    })
  }
  const handleMinPriceChange = (e) => {
    let val = e.target.value;
    setValue1([Math.min(val, value1[1] - minDistance), value1[1]]);
    navigate(router.asPath, {
      minPrice: Math.min(val, value1[1] - minDistance),
      maxPrice: value1[1]
    })
  };
  const handleMaxPriceChange = (e) => {
    let val = e.target.value;
    setValue1([value1[0], Math.max(val, value1[0] + minDistance)]);
    navigate(router.asPath, {
      minPrice: value1[0],
      maxPrice: Math.max(val, value1[0] + minDistance)
    })
  };

  const resetFilters = () => {
    setValue1([1, max_value])
    router.push(router.asPath.split("?")[0])
  };

  const values = React.useMemo(() => {
    let a = [1];
    for (let index = 10; index <= 300; index += 10) {
      a.push(index);
    }
    for (let index = 400; index <= 1000; index += 100) {
      a.push(index);
    }
    return a;
  }, []);



  return (
    <section className="position-relative">
      <label htmlFor="toggle" className="position-relative d-lg-none btn btn-primary">
        <FilterAltIcon />
        <i className="px-2"></i>
        فیلتر ها
      </label>

      <input type="checkbox" name='toggle' className="toggle-input" />

      <div id='shop-filter' >
        <p className="d-flex align-items-center justify-content-between m-0 mb-3 h-100 line-height-64">
          <span className="fs-4">فیلترها</span>
          <small
            className="text-danger fs-6 cursor-pointer"
            onClick={resetFilters}
          >
            پاک کردن همه
          </small>
        </p>
        <div className={"product-list-gift " }>
          <div className={"filter filter-country " + ( (!brand_set || brand_set.length === 0) && 'd-none')}>
            <span className="title ">کشور </span>
            <div className="d-flex flex-wrap justify-content-start w-100">
              <i></i>
              {brand_set?.map((subbrand, idx) => {
                const symbol = String(subbrand?.country_id?.symbol).toLowerCase()
                return <Link href={`/shop/${brand.name}/${symbol}-card`} key={idx} shallow={false}>
                  <a className="sub-brand-link border p-2 d-flex align-items-center mb-1 w-100 rounded">
                   <small>گیفت کارت {subbrand?.persian_name}</small>
                    <ChevronLeft size='small' className="me-auto" />
                  </a>
                </Link>
              })}

            </div>
          </div>
          <div className="filter filter-category">
            <span className="title">دسته بندی</span>
            <div className="d-flex flex-wrap  ">
              {categories.current.map((i, idx) => {
                return (
                  <React.Fragment
                    key={idx}
                  >
                    <button
                      style={{ padding: 8 }}
                      className={
                        "category-item " +
                        (i.name === brand_name ? "active" : "")
                      }
                      onClick={() => router.push("/shop/" + i.name)}
                    >
                      {i.persian_name}{" "}
                    </button>
                  </React.Fragment>
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
                onChange={e => handleAccount(e.target.value)}
              >
                <FormControlLabel className="m-0" value="giftcard" control={<Radio />} label="گیفت کارت" />
                <FormControlLabel className="m-0" value="account" control={<Radio />} label="  اشتراک ماهیانه" />
                <FormControlLabel className="m-0" value="all" control={<Radio />} label="هردو" />
              </RadioGroup>

            </div>
          </div>

          <div className="filter filter-price ">
            <span className="title">قیمت</span>
            <div className="drops d-flex align-items-center w-100">
              <FormControl sx={{ m: 1, flexGrow: 1 }}>
                <Select
                  value={value1[0]}
                  onChange={handleMinPriceChange}
                  displayEmpty
                  className="p-0"
                >
                  {values.map((i, idx) => { return <MenuItem value={i} key={idx}> {i} </MenuItem>})}
                </Select>
              </FormControl>
              {" تا "}
              <FormControl sx={{ m: 1, flexGrow: 1 }}>
                <Select
                  value={value1[1]}
                  onChange={handleMaxPriceChange}
                >
                    { values.map((i, idx) => { return <MenuItem key={idx} value={i}>{i}</MenuItem>}) }
                </Select>
              </FormControl>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}

export default ShopFilters;
