import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { options } from '../../constansts';


export const getLanguages = createAsyncThunk(
  'getLanguages',
  async () => {

    const res = await axios.request(options);

    return res.data.data.languages;
  }
);


export const translateText = createAsyncThunk(
  'translateText',
  async (param) => {
    
    const params = new URLSearchParams();
    params.set('source_language', param.sourceLang.value);
    params.set('target_language', param.targetLang.value);
    params.set('text', param.text);

    const options2 = {
      method: 'POST',
      url: 'https://text-translator2.p.rapidapi.com/translate',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key':
          '75dc092df0msh3c03138e5cc1ea2p19035ejsn916bcc592247',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
      },
      data: params,
    };

    const res = await axios.request(options2);
   
    return res.data.data.translatedText;
  }
);