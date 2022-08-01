import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import InputAdornment from '@mui/material/InputAdornment'

import { COMPANY_SEARCH_API } from 'constants'
import CompanyAvatar from 'components/CompanyAvatar'

const hasOption = (options, name) => options.some((o) => o.name === name)

const CompanyAutocomplete = ({ value, onChange, error, helperText }) => {
  const [query, setQuery] = useState(null)
  const [options, setOptions] = useState([])

  useEffect(() => {
    let active = true

    if (!query) {
      setOptions(value ? [value] : [])
    } else {
      fetch(COMPANY_SEARCH_API + `?query=${query}`)
        .then((res) => res.json())
        .then((newOptions) => {
          if (active) {
            if (value && !hasOption(newOptions, value.name)) {
              setOptions([value, ...newOptions])
            } else {
              setOptions(newOptions)
            }
          }
        })
    }

    return () => {
      active = false
    }
  }, [query])

  const handleInputChange = (e, inputVal) => setQuery(inputVal)

  const handleChange = (e, val) => {
    const newValue =
      typeof val === 'string'
        ? { name: val }
        : val?.inputValue
        ? { name: val.inputValue }
        : val

    if (newValue && !hasOption(options, newValue.name)) {
      setOptions([newValue, ...options])
    }
    onChange(newValue)
  }

  return (
    <Autocomplete
      id="company"
      value={value}
      options={options}
      onChange={handleChange}
      onInputChange={handleInputChange}
      isOptionEqualToValue={(opt, value) =>
        opt.domain ? opt.domain === value.domain : opt.name === value.name
      }
      getOptionLabel={(opt) =>
        typeof opt === 'string'
          ? opt
          : opt.inputValue || opt.domain
          ? `${opt.name} (${opt.domain})`
          : opt.name
      }
      autoHighlight
      clearOnBlur
      selectOnFocus
      handleHomeEndKeys
      renderOption={(props, option) => (
        <li {...props}>
          {!option.inputValue && (
            <CompanyAvatar
              src={option.logo}
              alt={option.name}
              size={20}
              sx={{ mr: 2, flexShrink: 0 }}
            />
          )}
          {option.name}
        </li>
      )}
      filterOptions={(options, { inputValue }) => {
        if (inputValue && !options.some((o) => inputValue === o.name)) {
          const addOption = { inputValue, name: `Add "${inputValue}"` }
          return [...options, addOption]
        }
        return options
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Company"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off',
          }}
          InputProps={{
            ...params.InputProps,
            ...{
              startAdornment: !value ? undefined : (
                <InputAdornment position="start">
                  <CompanyAvatar
                    sx={{ ml: 2 }}
                    src={value.logo}
                    alt={value.name}
                  />
                </InputAdornment>
              ),
            },
          }}
          error={error}
          helperText={helperText}
          margin="normal"
          fullWidth
          required
        />
      )}
    />
  )
}

export default CompanyAutocomplete
