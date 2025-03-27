const mockDestinationsList = [
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Chamonix1',
        description: 'Chamonix parliament building'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Chamonix2',
        description: 'Chamonix city view'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Chamonix3',
        description: 'Chamonix mountain landscape'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Chamonix4',
        description: 'Chamonix central square'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Chamonix5',
        description: 'Chamonix railway station'
      }
    ]
  },
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edcag',
    description: 'Tokyo, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Tokyo',
    pictures: [
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Tokyo1',
        description: 'Tokyo Tower'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Tokyo2',
        description: 'Shibuya Crossing'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Tokyo3',
        description: 'Asakusa Temple'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Tokyo4',
        description: 'Shinjuku skyline'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Tokyo5',
        description: 'Akihabara district'
      }
    ]
  },
  {
    id: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    description: 'Berlin, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Berlin',
    pictures: [
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Berlin1',
        description: 'Brandenburg Gate'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Berlin2',
        description: 'Berlin Cathedral'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Berlin3',
        description: 'East Side Gallery'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Berlin4',
        description: 'Alexanderplatz'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Berlin5',
        description: 'Berlin TV Tower'
      }
    ]
  },
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edcad',
    description: 'Milan, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Milan',
    pictures: [
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Milan1',
        description: 'Milan Cathedral'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Milan2',
        description: 'Galleria Vittorio Emanuele II'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Milan3',
        description: 'Sforza Castle'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Milan4',
        description: 'La Scala Opera House'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Milan5',
        description: 'Navigli District'
      }
    ]
  },
  {
    id: 'cfe416cq-10xa-ye10-8077-4zk9a01edcab',
    description: 'Bern, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Bern',
    pictures: [
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Bern1',
        description: 'Federal Palace'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Bern2',
        description: 'Zytglogge Clock Tower'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Bern3',
        description: 'Bear Park'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Bern4',
        description: 'Old Town streets'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Bern5',
        description: 'Aare River view'
      }
    ]
  },
  {
    id: 'cfe416cq-10xa-ye15-1477-4zk9a01edcab',
    description: 'Seoul, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Seoul',
    pictures: [
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Seoul1',
        description: 'Gyeongbokgung Palace'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Seoul2',
        description: 'N Seoul Tower'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Seoul3',
        description: 'Myeongdong shopping street'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Seoul4',
        description: 'Bukchon Hanok Village'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Seoul5',
        description: 'Dongdaemun Design Plaza'
      }
    ]
  },
  {
    id: 'zke216cq-10xa-ye15-1477-4zk9a01edcab',
    description: 'Belgrade, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Belgrade',
    pictures: [
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Belgrade1',
        description: 'Kalemegdan Fortress'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Belgrade2',
        description: 'St. Sava Temple'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Belgrade3',
        description: 'Skadarlija Street'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Belgrade4',
        description: 'Ada Ciganlija'
      },
      {
        // src: 'https://dummyimage.com/400x300/000/fff&text=Belgrade5',
        description: 'Nikola Tesla Museum'
      }
    ]
  }
];

function getMockDestinationsList () {
  return mockDestinationsList;
}

export {getMockDestinationsList};
