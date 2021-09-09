import { NextApiRequest, NextApiResponse } from 'next';

// This cache will reset every time the server restarts.
const cache = new Map();

/**
 * @param {NextApiRequest} req - The request sent to this api.
 * @param {NextApiResponse} res - The response sent from this api.
 */
export default async (req, res) => {
	const city = req.query.city;
	const data = {
		popular: [],
		categories: [],
		new: [],
		mustTryChefs: [],
		kitchens: []
	};

	if (
		cache.has(`popular-${city.toLowerCase()}`) &&
		cache.has(`new-${city.toLowerCase()}`) &&
		cache.has('categories') &&
		cache.has('must-try-chefs')
	) {
		data.popular = cache.get(`popular-${city.toLowerCase()}`);
		data.new = cache.get(`popular-${city.toLowerCase()}`);
		data.categories = cache.get('categories');
		data.mustTryChefs = cache.get('must-try-chefs');
	} else {
		const res = await fetch(`https://mycheffy.herokuapp.com/home?city=${city}`).then(r => r.json());

		// // Popular and New section.
		const popular = res?.data?.popular;
		const newFood = res?.data?.new;

		cache.set(`popular-${city.toLowerCase()}`, popular?.slice(0, 20));
		cache.set(`new-${city.toLowerCase()}`, newFood?.slice(0, 20));

		data.popular = popular.slice(0, 20);
		data.new = newFood.slice(0, 20);

		// Categories.
		const categories = res?.data?.categories;
		for (const category of categories) {
			data.categories.push({ id: category.id, name: category.name, url: category.url });
		}
		cache.set('categories', data.categories);

		// Must Try Chefs.
		data.mustTryChefs = res?.data?.mustTryChefs;
		cache.set('must-try-chefs', data.mustTryChefs);
	}

	if (cache.has('kitchens')) {
		data.kitchens = cache.get('kitchens');
	} else {
		const res = await fetch('https://cheffyus-api.herokuapp.com/kitchens/').then(res => res.json());
		for (const obj of res) {
			data.kitchens.push(obj.kitchen);
		}
		cache.set('kitchens', data.kitchens);
	}

	res.setHeader('Cache-Control', 'max-age=3600');
	return res.json({ ...data });
};
