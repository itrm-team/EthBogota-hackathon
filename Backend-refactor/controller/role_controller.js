const { Role, Sequelize, sequelize } = require("./../models");
const axios = require("axios");


module.exports = {
	get: async function (req, res) {
		try {
			const { role } = req.query;
			const currentRole = await Role.findOne({
				where: { role },
			});
			if (!currentRole) return res.status(400).send("role does not exist");
			return res.status(200).json(currentRole);
		} catch (error) {
			//console.error("error getting role", error);
			return res.satus(400).json({ msg: error.message });
		}
	},
	create: async function (req, res) {
		try {
			const { roleName } = req.body;
			if (!roleName) return res.status(400).send("incomplete params");
			const role = Role.build(roleName);
			role.save();
			const response = { ...roleName };
			return res.status(200).json(response);
		} catch (error) {
			return res.satus(400).json({ msg: error.message });
		}
	},

	getAll: async function (req, res) {
		try {
			const roles = await Role.findAll();
			if (!roles) return res.status(400).send("couldn't bring roles");
			return res.status(200).json(roles);
		} catch (error) {
			return res.satus(400).json({ msg: error.message });
		}
	},

	delete: async function (req, res) {
        try {
            
        } catch (error) {
            
        }
    },

	update: async function (req, res) {
        try {
            
        } catch (error) {
            
        }
    },
};
