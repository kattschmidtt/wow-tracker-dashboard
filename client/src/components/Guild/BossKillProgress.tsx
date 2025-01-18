import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { RaidModel } from '../../Models/raidModel';

const BossKillProgress = () => {
  const [bosses, setBosses] = useState<RaidModel[] | null>(null);
  const [boss, setBoss] = useState<string>('hi');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: SelectChangeEvent) => {
    setBoss(event.target.value);
  };

  useEffect(() => {
    fetch('http://localhost:8080/staticRaidData')
    .then(resp => {
      if (!resp.ok) {
        throw new Error('Network response was no bueno')
      }
      return resp.json();
    })
    .then(data => {
      console.log('static raid info: ', data);
      setBosses(data.name);
      setBoss(data[0].name)
      setIsLoading(false);
    })
    .catch(err => {
      console.log(err);
      setIsLoading(false);
      setError(err);
    })
  }, []);


  console.log(bosses);
  console.log(boss);

  return (
    <>
    <h4>{`${boss} Kill Progress`}
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <Select
        value={boss}
        label="bosses"
        onChange={handleChange}
      >
        {bosses ? bosses.map((item) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
          </li>
        )) : (
          <span>no bosses</span>
        )}
        <MenuItem value={10}>ten</MenuItem>
      </Select>
    </FormControl>
    </h4>
    </>
  );
};

export default BossKillProgress;