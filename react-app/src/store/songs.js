//* =====================  types ===========================//
const GET_ALL_SONGS_ACTION = "songs/GET_ALL_SONGS_ACTION";
const GET_SONG_BY_ID_ACTION = "songs/GET_SONG_BY_ID_ACTION";
const POST_NEW_SONG_ACTION = "songs/POST_NEW_SONG_ACTION";
const EDIT_SONG_BY_ID_ACTION = "songs/EDIT_SONG_BY_ID_ACTION";
const DELETE_SONG_BY_ID_ACTION = "songs/DELETE_SONG_BY_ID_ACTION";
const PLAY_CURRENT_USER_SONG_ACTION = "songs/PLAY_CURRENT_USER_SONG_ACTION";
const IS_PLAYING_BOOLEAN_ACTION = "songs/IS_PLAYING_BOOLEAN_ACTION";
// TEST AWS
// const TEST_AWS_ROUTE_ACTION = "songs/TEST_AWS_ROUTE_ACTION";
//*  ===================end of types ===================//

//? =====================  actions ===========================//

const getAllSongAction = (allSongs) => {
  return {
    type: GET_ALL_SONGS_ACTION,
    allSongs,
  };
};

const getSongByIdAction = (song) => {
  return {
    type: GET_SONG_BY_ID_ACTION,
    song,
  };
};

const postNewSongAction = (newSong) => {
  return {
    type: POST_NEW_SONG_ACTION,
    newSong,
  };
};

const editSongByIdAction = (updatedSong) => {
  return {
    type: EDIT_SONG_BY_ID_ACTION,
    updatedSong,
  };
};

const deleteSongByIdAction = (songId, res) => {
  return {
    type: DELETE_SONG_BY_ID_ACTION,
    songId,
    res,
  };
};

export const playUserSongAction = (song) => {
  return {
    type: PLAY_CURRENT_USER_SONG_ACTION,
    song,
  };
};

export const setPlayingState = (boolean) => {
  return {
    type: IS_PLAYING_BOOLEAN_ACTION,
    boolean,
  };
};

// TEST AWS
// const testAws = (test) => {
//   console.log("in the testAws action -- dispatched from thunk", test);
//   return {
//     type: TEST_AWS_ROUTE_ACTION,
//     test,
//   };
// };

//?  ======================= end of actions ===================//

//*  =====================  thunks ===========================//

export const thunkGetAllSongs = () => async (dispatch) => {
  let songs = await fetch(`/api/songs/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Can input more KVP here to grab from headers in the backend
    },
  });
  songs = await songs.json();
  dispatch(getAllSongAction(songs));
  return songs;
};

export const thunkGetSongById = (songId) => async (dispatch) => {
  let song = await fetch(`/api/songs/${songId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Can input more KVP here to grab from headers in the backend
    },
  });
  song = await song.json();
  dispatch(getSongByIdAction(song));
  return song;
};

export const thunkPostNewSong = (songFormData) => async (dispatch) => {
  let newSong = await fetch(`/api/songs/new`, {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: songFormData,
  });
  if (newSong) {
    newSong = await newSong.json();
    dispatch(postNewSongAction(newSong));
    return newSong;
  } else {
    // console.log("error: Song not okay");
    return;
  }
};

export const thunkEditSongById =
  (songId, updatedSongFormData) => async (dispatch) => {
    let updatedSong = await fetch(`/api/songs/${songId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSongFormData),
    });
    updatedSong = await updatedSong.json();
    dispatch(editSongByIdAction(updatedSong));
    return updatedSong;
  };

export const thunkDeleteUserSong = (songId) => async (dispatch) => {
  let deleted = await fetch(`/api/songs/${songId}`, {
    method: "DELETE",
  });
  if (deleted.ok) {
    deleted = await deleted.json();
    dispatch(deleteSongByIdAction(songId, deleted));
    return deleted;
  }
  return deleted.errors;
};

// TEST AWS THUNK
// export const thunkTestAws = (formData) => async (dispatch) => {
//   console.log("thunk executed -- pre-fetch");
//   let song = await fetch(`/api/songs/test`, {
//     method: "POST",
//     body: formData,
//   });

//   if (song.ok) {
//     // const { song } = await res.json();
//     song = await song.json();
//     console.log("song ok--this is song from song.json()", song);
//     dispatch(testAws(song));
//     return song;
//   } else {
//     console.log("ERRRORRRRR MESSAAAAGE");
//     return;
//   }
// };

//*  ======================= end of thunks ===================//

//? ================== reducer================================//
let initialState = {
  Songs: {},
  SongDetails: {},
  UserSongs: {},
  CurrentlyPlaying: {
    artistId: 1,
    artistInfo: {
      displayName: "Enter your display name here",
      email: "demo@aa.io",
      firstName: "Demo",
      id: 1,
      lastName: "FiftyNine",
      profileBio: "This is a demo account for demo users",
      profileCity: "",
      profileCountry: "",
      profileImage:
        "https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png",
      username: "Demo",
    },
    caption: "Bangers All Around",
    description: "Default Description From BangerSounds",
    genre: "Dance & EDM",
    id: 1,
    private: false,
    songURL:
      "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/Adventure+Club+x+Said+the+Sky+-+Already+Know+(Feat.+Caly+Bevier).mp3",
    title: "Adventure Club x Said the Sky - Already Know (Feat. Caly Bevier)",
    thumbnail:
      "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/11.jpg",
  },
  isPlaying: false,
};
export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_SONGS_ACTION: {
      newState = { ...state };
      newState.Songs = { ...action.allSongs.Songs };
      return newState;
    }
    case GET_SONG_BY_ID_ACTION: {
      newState = { ...state };
      newState.SongDetails = action.song;
      return newState;
    }
    case POST_NEW_SONG_ACTION: {
      newState = { ...state };
      newState.Songs[action.newSong.id] = action.newSong;
      return newState;
    }
    case EDIT_SONG_BY_ID_ACTION: {
      newState = { ...state };
      newState.Songs[action.updatedSong.id] = { ...action.updatedSong };
      return newState;
    }
    case DELETE_SONG_BY_ID_ACTION: {
      newState = { ...state };
      newState.Songs = { ...newState.Songs };
      delete newState.Songs[action.songId];
      return newState;
    }
    case PLAY_CURRENT_USER_SONG_ACTION: {
      newState = { ...state };
      newState.CurrentlyPlaying = {};
      newState.CurrentlyPlaying = { ...action.song };
      return newState;
    }
    case IS_PLAYING_BOOLEAN_ACTION: {
      newState = { ...state };
      newState.isPlaying = action.boolean;
      return newState;
    }

    // TEST AWS
    // case TEST_AWS_ROUTE_ACTION: {
    //   newState = {};
    //   console.log("action.test in the reducer", action.test);
    //   newState.awsURL = action.test;
    // }
    default:
      return state;
  }
}
