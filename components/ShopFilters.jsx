import React from "react";
import Slider from "@mui/material/Slider";
import { Select, MenuItem, FormControl, Button } from "@mui/material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { useSelector } from "react-redux";
import Link from "next/link";
function ShopFilters({
  min_value = 0,
  max_value = 50000,
  setCards,
  brand_name = null,
}) {
  const minDistance = 5000;

  const [value1, setValue1] = React.useState([min_value, max_value]);
  const [rateValue, setRateValue] = React.useState([1, 5]);
  const [values, setValues] = React.useState([]);
  const [selectedCountries, setSelectedCountries] = React.useState([]);
  const countries = useSelector((state) => state.main.countries);
  const categories = useSelector((state) => state.main.brands);
  const mainCards = useSelector((state) => state.main.cards);

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
  };
  React.useEffect(() => {
    let a = [];
    for (let index = 0; index <= max_value + 10000; index += 10000) {
      a.push(index);
    }
    setValues(a);
  }, []);

  React.useEffect(() => {
    setCards(
      mainCards.filter((i) => i.rate >= rateValue[0] && i.rate <= rateValue[1])
    );
  }, [rateValue]);

  React.useEffect(() => {
    setCards(
      mainCards.filter((i) => i.price >= value1[0] && i.price <= value1[1])
    );
  }, [value1]);

  React.useEffect(() => {
    if (selectedCountries.length) {
      setCards(
        mainCards.filter((i) =>
          selectedCountries
            .map((i) => i.toLowerCase())
            .includes(i.country_id.symbol.toLowerCase())
        )
      );
    } else {
      setCards(mainCards);
    }
  }, [selectedCountries]);

  return (
    <div>
      <h4 className="d-flex align-items-center justify-content-between m-0 h-100 line-height-64">
        <span>فیلترها</span>
        <small
          className="text-danger fs-6 cursor-pointer"
          onClick={resetFilters}
        >
          پاک کردن همه
        </small>
      </h4>
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
                    {i.name}
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="filter filter-country">
          <span className="title">کشور</span>
          <div className="d-flex flex-wrap justify-content-evenly">
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

        <div className="filter filter-price mt-5">
          <span className="title">قیمت</span>
          {mainCards.length ? (
            <Slider
              getAriaLabel={() => "price"}
              value={value1}
              onChange={handleChange1}
              valueLabelDisplay="auto"
              disableSwap
              marks
              isRtl
              step={10000}
              min={0}
              max={values[values.length - 1]}
            />
          ) : null}

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

        <div className="filter filter-rate">
          <span className="title">امتیاز مشتریان</span>
          <Slider
            getAriaLabel={() => "rate"}
            value={rateValue}
            onChange={handleRateChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            disableSwap
            marks={[1, 2, 3, 4, 5].map((i) => {
              return { value: i, label: i };
            })}
            isRtl={true}
            step={1}
            min={1}
            max={5}
          />
        </div>
      </div>
    </div>
  );
}

export default ShopFilters;
