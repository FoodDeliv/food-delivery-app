import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl = 'http://127.0.0.1:8000/api/food';

  private mockData = {
    restaurants: [
        { id: 1, name: 'Bahandi', rating: 4.6, description: 'Лучшие бургеры в городе', is_open: true, imageUrl: 'https://merey.kz/storage/establishments/July2024/ZZ3ZMwllKAs4covwtb11.jpg' },
        { id: 2, name: 'Burger King', rating: 4.2, description: 'Вкусно и быстро', is_open: true, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcwdoqIw2FZUlb70rze7gtZiod6Hwos8Sl0w&s'},
        { id: 3, name: 'Deli Kitchen', rating: 4.8, description: 'Домашняя еда', is_open: false, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdcfBDXxlJ0gMu9Qsi7aZ6vOrCfv1gQaV0KQ&s' },
        { id: 4, name: 'Popeyes', rating: 5.0, description: 'Куринные острые крылья', is_open: true, imageUrl: 'https://www.shuttledelivery.co.kr/uploads/popeyes_logo_ed8b30b7ed1a51c1c68c0080049d45e91736229553.jpg'},
        { id: 5, name: 'Navat', rating: 4.9, description: 'Восточная и национальная кухня, лучший бешбармак', is_open: true, imageUrl: 'https://static.tildacdn.pro/tild6336-3031-4866-a362-343230613330/Navat_logo_2-01.jpg' },
        { id: 6, name: 'Lanzhou', rating: 4.7, description: 'Легендарная лапша ручного приготовления', is_open: true, imageUrl:'https://avatars.mds.yandex.net/i?id=9edf12b25d6fc51828654af25b8204571f345aee-5235138-images-thumbs&n=13' },
        { id: 7, name: 'BAO Noodles & Bowls', rating: 4.5, description: 'Современная паназиатская кухня', is_open: true, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoAeblLYMTg8GJdV2jEKXV0NCQsMUPsJ418w&s'},
        { id: 8, name: 'Vanilla Coffee Shop', rating: 4.8, description: 'Свежая выпечка и лучший кофе в городе', is_open: true, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVtdOoDQYy3ucDjtqqtK41KTSlTpzHU7oiDA&s'},
        { id: 9, name: 'Del Papa', rating: 4.6, description: 'Уютный итальянский ресторан, паста и пицца', is_open: true, imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHlc2M68LpYtyyAqc58Hrio34zhw82nf-QXA&s' },
        { id: 10, name: 'Salam Bro', rating: 4.4, description: 'Быстрые и сочные хот-доги и бургеры', is_open: true, imageUrl:'https://merey.kz/storage/establishments/July2024/vbNyHtdl2OgPaDWwHV4C.png' },
        { id: 11, name: 'Mangal', rating: 4.7, description: 'Турецкий сервис и сочный шашлык', is_open: true, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPEeIsg7tH4T3cmSgyDY16nuJyd0SqAc93oQ&s'},
        { id: 12, name: 'Double Coffee', rating: 4.3, description: 'Европейская кухня и завтраки весь день', is_open: true, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh-Qkx7UjW2Ofw6iTYEXB-NdxjvRPcqLiE9A&s'},
        { id: 13, name: 'Dodo Pizza', rating: 4.5, description: 'Быстрая доставка и горячая пицца', is_open: true, imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnLpp50VEphmptQoT_1hgfVm7qxkz8Ekkomw&s' },
        { id: 14, name: 'Rumi', rating: 4.8, description: 'Центр плова и восточного гостеприимства', is_open: true, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmJy7wtYArI5TaAeOaD9lspE8_KavAitfP7g&s'}

    ],
    foods: [
        { id: 101, name: 'Mix Burger x2', price: 2100, restId: 1, weight: '450г' , imageUrl: 'https://bahandi.kz/netcat_files/22/64/mix_burger_x2_550x550.jpg'},
        { id: 102, name: 'Cheese Burger ', price: 1700, restId: 1, weight: '320г', imageUrl: 'https://bahandi.kz/netcat_files/22/64/cheese_burger_chicken_550x550.jpg' },
        { id: 103, name: 'Халапеньо', price: 200, restId: 1, weight: '30г', imageUrl: 'https://bahandi.kz/netcat_files/24/66/jalapeno_550x550.jpg' },
        { id: 119, name: 'Картофель фри', price: 800, restId: 1, weight: '150г', imageUrl: 'https://bahandi.kz/netcat_files/22/64/fries_550x550.jpg' },

        // Navat (ID: 5)
        { id: 105, name: 'Бешбармак по-казахски', price: 4500, restId: 5, weight: '600г', imageUrl: 'https://delivery.navat.kz/storage/263/p8KmWU7bbYbx2UAX9NvrGcPudkdkr1ZmAYpeqpWU.jpg' },
        { id: 106, name: 'Баурсаки (корзина)', price: 800, restId: 5, weight: '250г', imageUrl: 'https://delivery.navat.kz/storage/19/IhWVfOX5zrnzJYaahF3yczX2VimFOWZZjRy2I02S.jpg' },
        { id: 120, name: 'Куырдак', price: 3200, restId: 5, weight: '400г', imageUrl: 'https://delivery.navat.kz/storage/113/n8ZC67zanehKKlIvFE6Rv6hrBxgy1KLHKMrEQBCI.jpg' },
        { id: 121, name: 'Ханский "Люля кебаб"', price: 3550, restId: 5, weight: '190г', imageUrl: 'https://delivery.navat.kz/storage/144/nVL16lv1ljeYfUlCHUnEHZiM6w9fnPWJwEzHAaIc.webp' },

        // Lanzhou (ID: 6)
        { id: 107, name: 'Лагман жареный (Цомян)', price: 2200, restId: 6, weight: '400г', imageUrl: 'https://ce6e1bcc-e329-4500-b965-54d06a22bcc8.selstorage.ru/4797206/5f9b3fb4-c09a-4615-992f-c0769c970bd8.png' },
        { id: 108, name: 'Рамен с говядиной', price: 1950, restId: 6, weight: '500г' , imageUrl: 'https://ce6e1bcc-e329-4500-b965-54d06a22bcc8.selstorage.ru/4797206/40c0551f-f329-4107-9fd5-e689e60e9f77.png'},
        { id: 122, name: 'Ганфан с мясом', price: 2100, restId: 6, weight: '450г', imageUrl: 'https://ce6e1bcc-e329-4500-b965-54d06a22bcc8.selstorage.ru/4797206/869f5b8f-81e2-491b-bfe1-cea828769fa8.png' },
        { id: 123, name: 'Пампушка', price: 190, restId: 6, weight: '50г', imageUrl: 'https://ce6e1bcc-e329-4500-b965-54d06a22bcc8.selstorage.ru/4797206/83b9724d-4829-4b50-8bf9-317b0c86a32a.png' },

        // BAO (ID: 7)
        { id: 109, name: 'Бао с уткой', price: 1650, restId: 7, weight: '180г', imageUrl: 'https://baofood.kz/storage/app/uploads/public/449/933/05a/thumb__480_0_0_0_auto.png' },
        { id: 110, name: 'Поке с лососем', price: 3200, restId: 7, weight: '350г', imageUrl: 'https://glovo.dhmedia.io/image/menus-glovo/products/a83a75a961116c55bb14319b5b03171ca325fa1be59ebbb6aa428b75c4832403?t=W3sicmVzaXplIjp7Im1vZGUiOiJmaXQiLCJ3aWR0aCI6MzIwLCJoZWlnaHQiOjMyMH19XQ==' },
        { id: 124, name: 'Том Ям с креветками', price: 3800, restId: 7, weight: '400г', imageUrl: 'https://baofood.kz/storage/app/uploads/public/761/cae/897/thumb__480_0_0_0_auto.png' },
        { id: 125, name: 'Мисо Широ ', price: 2600, restId: 7, weight: '300г', imageUrl: 'https://baofood.kz/storage/app/uploads/public/f90/def/534/thumb__480_0_0_0_auto.png' },

        // Vanilla (ID: 8)
        { id: 111, name: 'Завтрак из трех яиц', price: 1200, restId: 8, weight: '400г', imageUrl: 'https://thumb.tildacdn.com/tild3036-3233-4635-b563-393630363537/-/format/webp/E273E3A8-60EA-4B81-A.jpeg' },
        { id: 112, name: 'Сладкие панкейки', price: 1700, restId: 8, weight: '200г', imageUrl: 'https://thumb.tildacdn.com/tild6332-3463-4636-a635-633732313765/-/format/webp/3C7B528D-1BA3-4CCA-B.jpeg' },
        { id: 126, name: 'Салат с киноа и авокадо', price: 2200, restId: 8, weight: '200г', imageUrl: 'https://thumb.tildacdn.com/tild3464-3562-4962-b265-623836613135/-/format/webp/73E8DAD7-41BF-4BA7-9.jpeg' },
        { id: 127, name: 'Грибной крем суп', price: 2800, restId: 8, weight: '250г', imageUrl: 'https://thumb.tildacdn.com/tild3133-3838-4566-a136-613230646264/-/format/webp/1F9B67F1-F40E-47CF-9.jpeg' },

        // Del Papa (ID: 9)
        { id: 113, name: 'Феттуччине с грибами', price: 2800, restId: 9, weight: '330г', imageUrl: 'https://glovo.dhmedia.io/image/menus-glovo/products/fd27012b039d5782fb47c3c934a01d873c42cb53bd77202ab939fe20bdd8934b?t=W3sicmVzaXplIjp7Im1vZGUiOiJmaXQiLCJ3aWR0aCI6MzIwLCJoZWlnaHQiOjMyMH19XQ==' },
        { id: 114, name: 'Пицца Пепперони', price: 3400, restId: 9, weight: '550г', imageUrl: 'https://glovo.dhmedia.io/image/menus-glovo/products/1d2c7684fcc6245d1cd9ad4493af612e214fbcc2e38412748f68d8434daa0825?t=W3sicmVzaXplIjp7Im1vZGUiOiJmaXQiLCJ3aWR0aCI6MzIwLCJoZWlnaHQiOjMyMH19XQ==' },
        { id: 128, name: 'Лазанья болоньезе', price: 3100, restId: 9, weight: '350г' , imageUrl: 'https://glovo.dhmedia.io/image/menus-glovo/products/7691618d2584641f865d1b0e012b074e918d6c22eba4825a9d51654869fc8005?t=W3sicmVzaXplIjp7Im1vZGUiOiJmaXQiLCJ3aWR0aCI6MzIwLCJoZWlnaHQiOjMyMH19XQ=='},

        // Salam Bro (ID: 10)
        { id: 115, name: 'Картофель Фри', price: 690, restId: 10, weight: '200г', imageUrl: 'https://glovo.dhmedia.io/image/menus-glovo/products/9df4d5b4a0304868aa69e482e3ea14766059e70d694cf38fef3791083e5b4a99?t=W3sicmVzaXplIjp7Im1vZGUiOiJmaXQiLCJ3aWR0aCI6MzIwLCJoZWlnaHQiOjMyMH19XQ==' },
        { id: 116, name: 'Coca Cola', price: 2600, restId: 10, weight: '500 ml' , imageUrl: 'https://glovo.dhmedia.io/image/menus-glovo/products/5f3db9e54600b862613321e172a9e063c29dcf7df945abf5e7364096d6bd06ba?t=W3sicmVzaXplIjp7Im1vZGUiOiJmaXQiLCJ3aWR0aCI6MzIwLCJoZWlnaHQiOjMyMH19XQ=='},
        { id: 129, name: 'Соус Сырный', price: 200, restId: 10, weight: '50г', imageUrl: 'https://glovo.dhmedia.io/image/menus-glovo/products/7af15a062b9aa97c23729a898e90fcdbc3aa4ab421f1c2ec108a164d1bd1f6e2?t=W3sicmVzaXplIjp7Im1vZGUiOiJmaXQiLCJ3aWR0aCI6MzIwLCJoZWlnaHQiOjMyMH19XQ==' },

        // Mangal (ID: 11)
        { id: 130, name: 'Куриный донер (Комбо)', price: 3200, restId: 11, weight: '450г' , imageUrl: 'https://glovo.dhmedia.io/image/menus-glovo/products/da962381f50476dcf0ad0c7ce54f0a151e453e5833462316df1c2c9a25961e7e?t=W3sicmVzaXplIjp7Im1vZGUiOiJmaXQiLCJ3aWR0aCI6MzIwLCJoZWlnaHQiOjMyMH19XQ=='},
        { id: 131, name: 'Говяжий донер', price: 1700, restId: 11, weight: '300г' , imageUrl: 'https://glovo.dhmedia.io/image/menus-glovo/products/a32a96c6748a5db821815d93ff5175d300a7b90217b4cdc79c8471f5a01d83ae' },
        { id: 132, name: 'Мангал бокс куриный', price: 2400, restId: 11, weight: '150г' , imageUrl: 'https://glovo.dhmedia.io/image/menus-glovo/products/1d37e7e65ceae7fc89a54e36dbed633cd1ac275d987a1a983d880d5ffb45480d' },

        // Rumi (ID: 14)
        { id: 117, name: 'Плов Ташкентский', price: 2800, restId: 14, weight: '400г' , imageUrl: 'https://imageproxy.wolt.com/menu/menu-images/611fa43ca983ac1c241b15dd/4fefd9fc-fb88-11f0-9ad0-8adc2b7d0bc3_2b3c8b7a50bb1f1cdeda5d0e17a766af.jpeg'},
        { id: 118, name: 'Шурпа', price: 1800, restId: 14, weight: '350г', imageUrl: 'https://imageproxy.wolt.com/menu/menu-images/611fa43ca983ac1c241b15dd/5005c73a-fb88-11f0-9ad0-8adc2b7d0bc3_1b52be0ff17705c10a6dccbf7af42d21.jpeg' },
        { id: 133, name: 'Манты с тыквой(4 шт)', price: 2400, restId: 14, weight: '450г' , imageUrl: 'https://imageproxy.wolt.com/menu/menu-images/611fa43ca983ac1c241b15dd/500cb00e-fb88-11f0-9ad0-8adc2b7d0bc3_45cd55e99d27a1dad33edd27a61fe836.jpeg'},
        { id: 134, name: 'Лепешка из тандыра', price: 350, restId: 14, weight: '150г', imageUrl: 'https://imageproxy.wolt.com/menu/menu-images/611fa43ca983ac1c241b15dd/4ff91c6a-fb88-11f0-9ad0-8adc2b7d0bc3_88f74d349ae9cd5afe15ae0d0494ec81.jpeg' },

        // Dodo Pizza (ID: 13)
        { id: 135, name: 'Додстер', price: 1100, restId: 13, weight: '210г' , imageUrl: 'https://media.dodostatic.net/image/r:1875x1875/0198eb2d853f768894e8b9f8e1e2f945.avif'},
        { id: 136, name: 'Пицца Четыре сезона', price: 3200, restId: 13, weight: '550г' , imageUrl: 'https://media.dodostatic.net/image/r:584x584/01995c479e6e7430b77b3b72a73d0416.avif'}
    ]
  };

 constructor(private http: HttpClient) { }

  
  private isAuthorized(): boolean {
    return !!localStorage.getItem('access_token');
  }

  // Локальный mock как fallback
  private getMockAll(): Observable<any> {
    const foods = this.mockData.foods.map(f => ({
      ...f,
      restaurantName: this.mockData.restaurants.find(r => r.id === f.restId)?.name || 'Ресторан'
    }));
    return of({ restaurants: this.mockData.restaurants, foods });
  }

  // ИСПРАВЛЕНО: авторизованный → бэкенд с fallback на mock при ошибке сети/пустой БД
  getAll(): Observable<any> {
    if (this.isAuthorized()) {
      return this.http.get<any[]>(`${this.apiUrl}/restaurants/`).pipe(
        map(res => {
          // Если бэкенд вернул пустой массив — используем mock
          if (!res || (res as any[]).length === 0) {
            const foods = this.mockData.foods.map(f => ({
              ...f,
              restaurantName: this.mockData.restaurants.find(r => r.id === f.restId)?.name || 'Ресторан'
            }));
            return { restaurants: this.mockData.restaurants, foods };
          }
          return { restaurants: res, foods: [] };
        }),
        catchError(() => this.getMockAll()) // При ошибке бэкенда — mock
      );
    }
    return this.getMockAll();
  }

  getSuggestions(query: string): Observable<string[]> {
    const q = query.toLowerCase();
    const names = [
      ...this.mockData.restaurants.map(r => r.name),
      ...this.mockData.foods.map(f => f.name)
    ];
    const filtered = names.filter(name => name.toLowerCase().includes(q));
    return of(filtered.slice(0, 5)); 
  }

  // ИСПРАВЛЕНО: бэкенд с fallback на mock при ошибке
  getRestaurantById(id: number | string): Observable<any> {
    if (this.isAuthorized()) {
      return this.http.get(`${this.apiUrl}/restaurants/${id}/`).pipe(
        catchError(() => {
          const restaurant = this.mockData.restaurants.find(r => r.id === Number(id));
          return of(restaurant);
        })
      );
    }
    const restaurant = this.mockData.restaurants.find(r => r.id === Number(id));
    return of(restaurant);
  }

  // ИСПРАВЛЕНО: бэкенд с fallback на mock при ошибке или пустом результате
  getFoodsByRestaurant(restId: number | string): Observable<any[]> {
    if (this.isAuthorized()) {
      return this.http.get<any[]>(`${this.apiUrl}/restaurants/${restId}/foods/`).pipe(
        map(res => {
          // Если бэкенд вернул пустой массив — используем mock
          if (!res || (res as any[]).length === 0) {
            return this.mockData.foods.filter(f => f.restId === Number(restId));
          }
          return res;
        }),
        catchError(() => {
          const foods = this.mockData.foods.filter(f => f.restId === Number(restId));
          return of(foods);
        })
      );
    }
    const foods = this.mockData.foods.filter(f => f.restId === Number(restId));
    return of(foods);
  }

  globalSearch(query: string): Observable<any> {
    const q = query.toLowerCase();

    // Поиск всегда можно оставить по локальным данным для мгновенного отклика (Find in Deli)
    const foundRestaurants = this.mockData.restaurants.filter(r => 
      r.name.toLowerCase().includes(q)
    );

    const foundFoods = this.mockData.foods
      .filter(f => f.name.toLowerCase().includes(q))
      .map(food => {
        const restaurant = this.mockData.restaurants.find(r => r.id === food.restId);
        return {
          ...food,
          restaurantName: restaurant ? restaurant.name : 'Неизвестный ресторан'
        };
      });

    return of({
      restaurants: foundRestaurants,
      foods: foundFoods
    });
  }
}