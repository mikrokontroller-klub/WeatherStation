/**
 * @description Resourceful controller for the users
 */
exports.userController = {
    /** Display a listing of the resource. */
    index: async (req, res) => {
        let users = [
            {
                id: 1,
                name: 'Kostyál Bálint',
            },
            {
                id: 2,
                name: 'Kis Béla',
            },
        ];
        res.render('pages/users/index', { activePage: 'users', users });
    },

    /** Show the form for creating a new resource. */
    create: async (req, res) => {
        res.render('pages/users/new', { activePage: 'users' });
    },

    /** Store a newly created resource in storage. */
    store: async (req, res) => {
        //TODO: Save sensor into DB
    },

    /** Display the specified resource. */
    show: async (req, res) => {
        let user = {
            id: 1,
            name: 'Kostyál Bálint',
            apiToken: 'This is a user api token',
        };
        res.render('pages/users/view', { activePage: 'users', user });
    },

    /** Show the form for editing the specified resource. */
    edit: async (req, res) => {
        let user = {
            id: 1,
            name: 'Kostyál Bálint',
            apiToken: 'This is a user api token',
        };
        res.render('pages/users/edit', { activePage: 'users', user });
    },

    /** Update the specified resource in storage. */
    update: async (req, res) => {
        //TODO: Update sensor in DB
    },

    /** Remove the specified resource from storage. */
    destroy: async (req, res) => {
        //TODO: Remove sensor from DB
    },
};
