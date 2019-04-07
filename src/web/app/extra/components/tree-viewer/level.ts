export const level = [
  {
    id: 1,
    name: 'bronze',
    requirement: null,
    bonus: null
  },
  {
    id: 2,
    name: 'silver',
    requirement: 3,
    bonus: [
      {
        name: 'group_development',
        type: 'percentage',
        value: 3
      },
      {
        name: 'city_development',
        type: 'percentage',
        value: null
      },
      {
        name: 'province_development',
        type: 'percentage',
        value: null
      },
      {
        name: 'national_development',
        type: 'percentage',
        value: null
      },
      {
        name: 'match',
        type: 'fixed',
        value: 50000
      },
      {
        name: 'sponsor',
        type: 'percentage',
        value: 10
      }
    ]
  },
  {
    id: 3,
    name: 'gold',
    requirement: 4,
    bonus: [
      {
        name: 'group_development',
        type: 'percentage',
        value: 6
      },
      {
        name: 'city_development',
        type: 'percentage',
        value: null
      },
      {
        name: 'province_development',
        type: 'percentage',
        value: null
      },
      {
        name: 'national_development',
        type: 'percentage',
        value: null
      },
      {
        name: 'match',
        type: 'fixed',
        value: 50000
      },
      {
        name: 'sponsor',
        type: 'percentage',
        value: 10
      }
    ]
  },
  {
    id: 4,
    name: 'diamond',
    requirement: 5,
    bonus: [
      {
        name: 'group_development',
        type: 'percentage',
        value: 9
      },
      {
        name: 'city_development',
        type: 'percentage',
        value: null
      },
      {
        name: 'province_development',
        type: 'percentage',
        value: null
      },
      {
        name: 'national_development',
        type: 'percentage',
        value: null
      },
      {
        name: 'match',
        type: 'fixed',
        value: 50000
      },
      {
        name: 'sponsor',
        type: 'percentage',
        value: 10
      }
    ]
  },
  {
    id: 5,
    name: 'double diamond',
    requirement: 3,
    bonus: [
      {
        name: 'group_development',
        type: 'percentage',
        value: 2
      },
      {
        name: 'city_development',
        type: 'percentage',
        value: .5
      },
      {
        name: 'province_development',
        type: 'percentage',
        value: null
      },
      {
        name: 'national_development',
        type: 'percentage',
        value: null
      },
      {
        name: 'match',
        type: 'fixed',
        value: 50000
      },
      {
        name: 'sponsor',
        type: 'percentage',
        value: 10
      }
    ]
  },
  {
    id: 6,
    name: 'triple diamond',
    requirement: 4,
    bonus: [
      {
        name: 'group_development',
        type: 'percentage',
        value: 3
      },
      {
        name: 'city_development',
        type: 'percentage',
        value: 1
      },
      {
        name: 'province_development',
        type: 'percentage',
        value: null
      },
      {
        name: 'national_development',
        type: 'percentage',
        value: null
      },
      {
        name: 'match',
        type: 'fixed',
        value: 50000
      },
      {
        name: 'sponsor',
        type: 'percentage',
        value: 10
      }
    ]
  },
  {
    id: 7,
    name: 'ambassador',
    requirement: 3
  },
  {
    id: 8,
    name: 'double ambassador',
    requirement: 5,
    bonus: [
      {
        name: 'group_development',
        type: 'percentage',
        value: 2
      },
      {
        name: 'city_development',
        type: 'percentage',
        value: null
      },
      {
        name: 'province_development',
        type: 'percentage',
        value: 1
      },
      {
        name: 'national_development',
        type: 'percentage',
        value: null
      },
      {
        name: 'match',
        type: 'fixed',
        value: 50000
      },
      {
        name: 'sponsor',
        type: 'percentage',
        value: 10
      }
    ]
  },
  {
    id: 9,
    name: 'triple ambassador',
    requirement: 4,
    bonus: [
      {
        name: 'group_development',
        type: 'percentage',
        value: null
      },
      {
        name: 'city_development',
        type: 'percentage',
        value: null
      },
      {
        name: 'province_development',
        type: 'percentage',
        value: null
      },
      {
        name: 'national_development',
        type: 'percentage',
        value: 1
      },
      {
        name: 'match',
        type: 'fixed',
        value: 50000
      },
      {
        name: 'sponsor',
        type: 'percentage',
        value: 10
      }
    ]
  }
]
export interface levelInterface {
  id: number;
  name: string;
  requirement: number;
  percentage?: [number]
}
