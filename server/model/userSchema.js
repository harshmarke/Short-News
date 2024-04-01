const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    preferences: [String], // Array of user preferences e.g., ['Business', 'Health', 'Sports']
    articleHistory: [
        {
            articleId: {
                type: mongoose.Schema.Types.ObjectId, // Assuming you have another schema for articles
                ref: 'Article'
            },
            keywords: [String], // Keywords extracted from the article
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

// Token generation method
userSchema.methods.generateAuthToken = async function() {
    try {
        let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    } catch (err) {
        console.error(err);
    }
};

// Method to add article to user's history
// userSchema.methods.addToArticleHistory = async function(articleId, keywords) {
//     try {
//         this.articleHistory.push({articleId, keywords});
//         await this.save();
//     } catch (err) {
//         console.error(err);
//     }
// };

// Method to retrieve articles based on user's preferences and history
// userSchema.statics.getRecommendedArticles = async function(userId) {
//     try {
//         const user = await this.findById(userId);
//         const userPreferences = user.preferences;
//         const userHistory = user.articleHistory.filter(
//             article => article.timestamp >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Filter articles within the last 30 days
//         );

//         // You can implement your logic to retrieve and rank articles based on user's preferences and history
//         // Example logic:
//         // const recommendedArticles = await Article.find({ $or: [{ keywords: { $in: userPreferences } }, { _id: { $in: userHistory.map(item => item.articleId) } }] }).sort({ createdAt: -1 }).limit(10);
//         // return recommendedArticles;

//     } catch (err) {
//         console.error(err);
//     }
// };


const User = mongoose.model('basic_profile',userSchema);

module.exports = User;