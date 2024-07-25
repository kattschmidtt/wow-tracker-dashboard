import { Card, CardContent, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AffixDetail } from '../../Models/affixModel';

const ThisWeekTracking = () => {
  const [affixList, setAffixList] = useState<AffixDetail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/affixes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was no bueno');
        }
        return response.json();
      })
      .then(data => {
        setAffixList(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError('Failed to fetch affixes');
        setIsLoading(false);
      });
  }, []);

  return (
    <Card>
      <CardContent>
        { !isLoading ? affixList.map(item => (<span>{item.name}</span>)) : <CircularProgress />}
      </CardContent>
    </Card>
  );
};

export default ThisWeekTracking;