import axiosClient from '../../../src/utils/axios-config';

const options = [];
for (let i = 0; i < 50; ++i) {
	options.push({
		value: i + 1,
		label: `Option ${i + 1}`
	});
}

const loadOptions = async (search, prevOptions) => {
	let res = INITIAL_DATA;
	if (search !== '') {
		try {
			res = await axiosClient.get(`user/search/${search}`);
			INITIAL_DATA = res;
		} catch (error) {}
	}

	return {
		options: [...res.plates?.slice(0, 10), ...res.restaurants?.slice(0, 5)]
	};
};

let INITIAL_DATA = {
	status: 200,
	plates: [
		{
			id: 1351,
			name: 'Carne Amante Pizza (12")',
			description:
				'Pepperoni, spicy Italian sausage, Italian meatball and fresh mozzarella and Parmesan cheeses with our tomato sauce.',
			price: 14,
			rating: null,
			userId: 78,
			delivery_time: 30,
			sell_count: 0,
			delivery_type: 'paid',
			available: true,
			chefDeliveryAvailable: false,
			categoryId: 4,
			createdAt: '2020-08-21T06:41:07.000Z',
			IsFavourite: false,
			PlateImages: [
				{
					id: 2421,
					name: 'Carne Amante Pizza (12")',
					url:
						'https://www.moulinex-me.com/medias/?context=bWFzdGVyfHJvb3R8MTQzNTExfGltYWdlL2pwZWd8aDM2L2g1Mi8xMzA5NzI3MzI2MjExMC5qcGd8N2MxZDhmNmI5ZTgzZDZlZWQyZGQ4YjFlZjUyNDlkMTExYjdkZDdlZmFkY2I0N2NmNjljOGViNmExZjIyMDU4Yw',
					plateId: 1351,
					createdAt: '2020-08-21T06:41:07.000Z',
					updatedAt: '2020-08-21T06:41:07.000Z'
				}
			]
		},
		{
			id: 1361,
			name: 'Arrabbiata Pizza (12")',
			description:
				'Spicy Italian sausage, kalamata olives, caramelized onions, fresh mozzarella and Parmesan cheeses with our arrabbiata sauce.',
			price: 13,
			rating: null,
			userId: 78,
			delivery_time: 30,
			sell_count: 0,
			delivery_type: 'paid',
			available: true,
			chefDeliveryAvailable: false,
			categoryId: 4,
			createdAt: '2020-08-21T06:44:10.000Z',
			IsFavourite: false,
			PlateImages: [
				{
					id: 2431,
					name: 'Arrabbiata Pizza (12")',
					url:
						'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/The-Best-Sausage-Pizzas_EXPS_TOHFM20_245369%20_E09_26_4b.jpg',
					plateId: 1361,
					createdAt: '2020-08-21T06:44:10.000Z',
					updatedAt: '2020-08-21T06:44:10.000Z'
				}
			]
		},
		{
			id: 1371,
			name: 'Formaggio Pizza (12")',
			description: 'Fresh mozzarella and Parmesan cheeses with our tomato sauce.',
			price: 11,
			rating: 5,
			userId: 78,
			delivery_time: 30,
			sell_count: 0,
			delivery_type: 'paid',
			available: true,
			chefDeliveryAvailable: false,
			categoryId: 3,
			createdAt: '2020-08-21T06:45:40.000Z',
			IsFavourite: false,
			PlateImages: [
				{
					id: 2441,
					name: 'Formaggio Pizza (12")',
					url: 'https://s3.przepisy.pl/przepisy3ii/img/variants/800x0/pizza-quattro-formaggi.jpg',
					plateId: 1371,
					createdAt: '2020-08-21T06:45:40.000Z',
					updatedAt: '2020-08-21T06:45:40.000Z'
				}
			]
		},
		{
			id: 3211,
			name: 'chocolate pizza',
			description: 'chocolate pizza',
			price: 45,
			rating: null,
			userId: 78,
			delivery_time: 60,
			sell_count: 0,
			delivery_type: 'free',
			available: true,
			chefDeliveryAvailable: false,
			categoryId: 3,
			createdAt: '2020-10-20T01:25:46.000Z',
			IsFavourite: false,
			PlateImages: [
				{
					id: 3391,
					name: '05280deb-1bc1-4838-b4d3-b0693430aaa0.jpg',
					url:
						'http://res.cloudinary.com/dexrrnlvq/image/upload/v1603157146/plate_image/1603157146436-50d5af6c-05280deb-1bc1-4838-b4d3-b0693430aaa0.jpg.jpg',
					plateId: 3211,
					createdAt: '2020-10-20T01:25:47.000Z',
					updatedAt: '2020-10-20T01:25:47.000Z'
				}
			]
		},
		{
			id: 2571,
			name: 'Cheese Pizza ',
			description:
				'Pizza cheese encompasses several varieties of cheese, which include processed and modified cheese such as mozzarella-like processed cheeses and mozzarella variants.',
			price: 10,
			rating: null,
			userId: 7611,
			delivery_time: 35,
			sell_count: 0,
			delivery_type: 'free',
			available: true,
			chefDeliveryAvailable: false,
			categoryId: 1002,
			createdAt: '2020-09-28T19:21:17.000Z',
			IsFavourite: false,
			PlateImages: [
				{
					id: 2921,
					name: 'plate_image',
					url:
						'http://res.cloudinary.com/dexrrnlvq/image/upload/v1601320879/plate_image/1601320878790-d54ec279-plate_image.jpg',
					plateId: 2571,
					createdAt: '2020-09-28T19:21:19.000Z',
					updatedAt: '2020-09-28T19:21:19.000Z'
				}
			]
		},
		{
			id: 2851,
			name: 'Margherita Pizza',
			description:
				'Pizza Margherita is a typical Neapolitan pizza, made with San Marzano tomatoes, mozzarella cheese, fresh basil, salt and extra-virgin olive oil.',
			price: 12.59,
			rating: null,
			userId: 7781,
			delivery_time: 32,
			sell_count: 0,
			delivery_type: 'free',
			available: true,
			chefDeliveryAvailable: false,
			categoryId: 1002,
			createdAt: '2020-09-29T18:48:13.000Z',
			IsFavourite: false,
			PlateImages: [
				{
					id: 3131,
					name: 'plate_image',
					url:
						'http://res.cloudinary.com/dexrrnlvq/image/upload/v1601405296/plate_image/1601405295284-39c21e1a-plate_image.jpg',
					plateId: 2851,
					createdAt: '2020-09-29T18:48:16.000Z',
					updatedAt: '2020-09-29T18:48:16.000Z'
				}
			]
		},
		{
			id: 3061,
			name: 'Pizza',
			description: 'Pizza with extra chizz and large.',
			price: 5,
			rating: null,
			userId: 8001,
			delivery_time: 17,
			sell_count: 0,
			delivery_type: 'free',
			available: true,
			chefDeliveryAvailable: false,
			categoryId: 1002,
			createdAt: '2020-10-10T16:35:57.000Z',
			IsFavourite: false,
			PlateImages: [
				{
					id: 3311,
					name: 'plate_image',
					url:
						'http://res.cloudinary.com/dexrrnlvq/image/upload/v1602347793/plate_image/1602347765144-88e4902b-plate_image.jpg',
					plateId: 3061,
					createdAt: '2020-10-10T16:36:34.000Z',
					updatedAt: '2020-10-10T16:36:34.000Z'
				}
			]
		},
		{
			id: 3091,
			name: 'Pizza',
			description: 'Chezzy pizza',
			price: 12,
			rating: null,
			userId: 8021,
			delivery_time: 21,
			sell_count: 0,
			delivery_type: 'paid',
			available: true,
			chefDeliveryAvailable: false,
			categoryId: 1058,
			createdAt: '2020-10-10T16:58:02.000Z',
			IsFavourite: false,
			PlateImages: [
				{
					id: 3321,
					name: 'plate_image',
					url:
						'http://res.cloudinary.com/dexrrnlvq/image/upload/v1602349093/plate_image/1602349085869-96460af5-plate_image.jpg',
					plateId: 3091,
					createdAt: '2020-10-10T16:58:13.000Z',
					updatedAt: '2020-10-10T16:58:13.000Z'
				}
			]
		},
		{
			id: 26151,
			name: 'Taco Pizza',
			description:
				'Taco seasoned beef, onions, blend of mozzarella cheese, and cheddar cheese. Topped with shredded lettuce, diced tomatoes, and sour cream.',
			price: 9.99,
			rating: 4.6445776963546495,
			userId: 10861,
			delivery_time: 48,
			sell_count: 0,
			delivery_type: 'paid',
			available: true,
			chefDeliveryAvailable: false,
			categoryId: 1063,
			createdAt: '2020-11-07T13:44:14.000Z',
			IsFavourite: false,
			PlateImages: [
				{
					id: 26181,
					name: 'Taco Pizza',
					url: 'https://d1ralsognjng37.cloudfront.net/41c5fc6d-b342-470b-ba35-4db48a7a7c25.jpeg',
					plateId: 26151,
					createdAt: '2020-11-07T13:44:14.000Z',
					updatedAt: '2020-11-07T13:44:14.000Z'
				}
			]
		},
		{
			id: 26161,
			name: 'Deluxe Pizza',
			description: 'Pepperoni, mushrooms, sausage, bell peppers, and onions.',
			price: 8.99,
			rating: 4.6445776963546495,
			userId: 10861,
			delivery_time: 48,
			sell_count: 0,
			delivery_type: 'paid',
			available: true,
			chefDeliveryAvailable: false,
			categoryId: 1063,
			createdAt: '2020-11-07T13:44:15.000Z',
			IsFavourite: false,
			PlateImages: [
				{
					id: 26191,
					name: 'Deluxe Pizza',
					url: 'https://d1ralsognjng37.cloudfront.net/8e2d424a-0469-4823-8e77-f91c99a2e0a8.jpeg',
					plateId: 26161,
					createdAt: '2020-11-07T13:44:15.000Z',
					updatedAt: '2020-11-07T13:44:15.000Z'
				}
			]
		},
		{
			id: 26381,
			name: 'Deluxe Pizza',
			description: 'Pepperoni, mushrooms, sausage, bell peppers, and onions.',
			price: 8.99,
			rating: 4.334715054111159,
			userId: 10861,
			delivery_time: 16,
			sell_count: 0,
			delivery_type: 'free',
			available: true,
			chefDeliveryAvailable: false,
			categoryId: 1301,
			createdAt: '2020-11-07T13:44:36.000Z',
			IsFavourite: false,
			PlateImages: [
				{
					id: 26411,
					name: 'Deluxe Pizza',
					url: 'https://d1ralsognjng37.cloudfront.net/8e2d424a-0469-4823-8e77-f91c99a2e0a8.jpeg',
					plateId: 26381,
					createdAt: '2020-11-07T13:44:36.000Z',
					updatedAt: '2020-11-07T13:44:36.000Z'
				}
			]
		},
		{
			id: 26401,
			name: 'Taco Pizza',
			description:
				'Taco seasoned beef, onions, blend of mozzarella cheese, and cheddar cheese. Topped with shredded lettuce, diced tomatoes, and sour cream.',
			price: 9.99,
			rating: 4.334715054111159,
			userId: 10861,
			delivery_time: 16,
			sell_count: 0,
			delivery_type: 'free',
			available: true,
			chefDeliveryAvailable: false,
			categoryId: 1301,
			createdAt: '2020-11-07T13:44:37.000Z',
			IsFavourite: false,
			PlateImages: [
				{
					id: 26431,
					name: 'Taco Pizza',
					url: 'https://d1ralsognjng37.cloudfront.net/41c5fc6d-b342-470b-ba35-4db48a7a7c25.jpeg',
					plateId: 26401,
					createdAt: '2020-11-07T13:44:37.000Z',
					updatedAt: '2020-11-07T13:44:37.000Z'
				}
			]
		},
		{
			id: 28811,
			name: 'Pizza Salad',
			description: 'Create your own salad on a warm asiago pizza crust',
			price: 13.07,
			rating: 4.4,
			userId: 10881,
			delivery_time: 43,
			sell_count: 0,
			delivery_type: 'free',
			available: true,
			chefDeliveryAvailable: false,
			categoryId: 1063,
			createdAt: '2020-11-07T13:58:40.000Z',
			IsFavourite: false,
			PlateImages: [
				{
					id: 28841,
					name: 'Pizza Salad',
					url: 'https://d1ralsognjng37.cloudfront.net/31f06f7f-76b6-4249-b280-627a6829d0bc.png',
					plateId: 28811,
					createdAt: '2020-11-07T13:58:40.000Z',
					updatedAt: '2020-11-07T13:58:40.000Z'
				}
			]
		},
		{
			id: 28841,
			name: 'Create Your Own Pizza',
			description: 'Any toppings, same price ',
			price: 8.07,
			rating: 4.4,
			userId: 10881,
			delivery_time: 43,
			sell_count: 0,
			delivery_type: 'free',
			available: true,
			chefDeliveryAvailable: false,
			categoryId: 1063,
			createdAt: '2020-11-07T13:58:42.000Z',
			IsFavourite: false,
			PlateImages: [
				{
					id: 28871,
					name: 'Create Your Own Pizza',
					url: 'https://d1ralsognjng37.cloudfront.net/2aed4222-dc8d-44e0-8707-1cf806298746.png',
					plateId: 28841,
					createdAt: '2020-11-07T13:58:42.000Z',
					updatedAt: '2020-11-07T13:58:42.000Z'
				}
			]
		},
		{
			id: 28851,
			name: 'CYO Pizza + Drink',
			description: 'Create Your Own pizza (MOD-size), plus a bottled drink',
			price: 13.14,
			rating: 4.4,
			userId: 10881,
			delivery_time: 43,
			sell_count: 0,
			delivery_type: 'free',
			available: true,
			chefDeliveryAvailable: false,
			categoryId: 1063,
			createdAt: '2020-11-07T13:58:42.000Z',
			IsFavourite: false,
			PlateImages: [
				{
					id: 28881,
					name: 'CYO Pizza + Drink',
					url: 'https://d1ralsognjng37.cloudfront.net/e97024e8-eeb0-46ea-997b-54cdf012bbaa.jpeg',
					plateId: 28851,
					createdAt: '2020-11-07T13:58:42.000Z',
					updatedAt: '2020-11-07T13:58:42.000Z'
				}
			]
		},
		{
			id: 29411,
			name: 'Pizza Salad',
			description: 'Create your own salad on a warm asiago pizza crust',
			price: 13.07,
			rating: 4.4,
			userId: 10881,
			delivery_time: 47,
			sell_count: 0,
			delivery_type: 'free',
			available: true,
			chefDeliveryAvailable: false,
			categoryId: 1291,
			createdAt: '2020-11-07T13:59:35.000Z',
			IsFavourite: false,
			PlateImages: [
				{
					id: 29441,
					name: 'Pizza Salad',
					url: 'https://d1ralsognjng37.cloudfront.net/31f06f7f-76b6-4249-b280-627a6829d0bc.png',
					plateId: 29411,
					createdAt: '2020-11-07T13:59:35.000Z',
					updatedAt: '2020-11-07T13:59:35.000Z'
				}
			]
		},
		{
			id: 30061,
			name: 'Create Your Own Pizza',
			description: 'Any toppings, same price ',
			price: 8.07,
			rating: 4.4,
			userId: 10881,
			delivery_time: 12,
			sell_count: 0,
			delivery_type: 'paid',
			available: true,
			chefDeliveryAvailable: false,
			categoryId: 1321,
			createdAt: '2020-11-07T14:02:23.000Z',
			IsFavourite: false,
			PlateImages: [
				{
					id: 30091,
					name: 'Create Your Own Pizza',
					url: 'https://d1ralsognjng37.cloudfront.net/2aed4222-dc8d-44e0-8707-1cf806298746.png',
					plateId: 30061,
					createdAt: '2020-11-07T14:02:23.000Z',
					updatedAt: '2020-11-07T14:02:23.000Z'
				}
			]
		},
		{
			id: 30071,
			name: 'CYO Pizza + Drink',
			description: 'Create Your Own pizza (MOD-size), plus a bottled drink',
			price: 13.14,
			rating: 4.4,
			userId: 10881,
			delivery_time: 12,
			sell_count: 0,
			delivery_type: 'paid',
			available: true,
			chefDeliveryAvailable: false,
			categoryId: 1321,
			createdAt: '2020-11-07T14:02:24.000Z',
			IsFavourite: false,
			PlateImages: [
				{
					id: 30101,
					name: 'CYO Pizza + Drink',
					url: 'https://d1ralsognjng37.cloudfront.net/e97024e8-eeb0-46ea-997b-54cdf012bbaa.jpeg',
					plateId: 30071,
					createdAt: '2020-11-07T14:02:24.000Z',
					updatedAt: '2020-11-07T14:02:24.000Z'
				}
			]
		},
		{
			id: 30081,
			name: 'Pizza Salad',
			description: 'Create your own salad on a warm asiago pizza crust',
			price: 13.07,
			rating: 4.4,
			userId: 10881,
			delivery_time: 12,
			sell_count: 0,
			delivery_type: 'paid',
			available: true,
			chefDeliveryAvailable: false,
			categoryId: 1321,
			createdAt: '2020-11-07T14:02:24.000Z',
			IsFavourite: false,
			PlateImages: [
				{
					id: 30111,
					name: 'Pizza Salad',
					url: 'https://d1ralsognjng37.cloudfront.net/31f06f7f-76b6-4249-b280-627a6829d0bc.png',
					plateId: 30081,
					createdAt: '2020-11-07T14:02:24.000Z',
					updatedAt: '2020-11-07T14:02:24.000Z'
				}
			]
		},
		{
			id: 33641,
			name: 'Cheese Pan Pizza',
			description:
				'Our PAN pizza crust is crisp and golden on the outside, thick and fluffy on the inside topped with tomato sauce and 100% real cheese.',
			price: 8.99,
			rating: 3.9,
			userId: 10881,
			delivery_time: 45,
			sell_count: 0,
			delivery_type: 'free',
			available: true,
			chefDeliveryAvailable: false,
			categoryId: 1063,
			createdAt: '2020-11-07T14:12:13.000Z',
			IsFavourite: false,
			PlateImages: [
				{
					id: 33671,
					name: 'Cheese Pan Pizza',
					url: 'https://d1ralsognjng37.cloudfront.net/ce5c17d2-765c-4af2-8158-169ed6a27c65.jpeg',
					plateId: 33641,
					createdAt: '2020-11-07T14:12:13.000Z',
					updatedAt: '2020-11-07T14:12:13.000Z'
				}
			]
		}
	],
	restaurants: []
};

export default loadOptions;
