var mongoose = register('mongoose');
var reviewSchema = require("review.schema.server");
var reviewModel = mongoose.model("ReviewModel", reviewSchema);

reviewModel.createReview = createReview;
reviewModel.findAllReviewsForUser = findAllReviewsForUser;
reviewModel.findReviewById = findReviewById;
reviewModel.updateReview = updateReview;
reviewModel.deleteReview = deleteReview;

function createReview(userId, review) {
    review._user = userId;
    return reviewModel.create(review);
}

function findAllReviewsForUser(userId) {
    return reviewModel
        .find({_user: userId})
        .populate("_review")
        .exec();
}

function findReviewById(reviewId) {
    return reviewModel.findById(reviewId);
}

function updateReview(reviewId, review) {
    return reviewModel.update({_id: reviewId}, {
        $set: {
            _user: review._user,
            content: review.content,
            rating: review.rating,
            _song: review._song
        }
    });
}

function deleteReview(reviewId) {
    return reviewModel.remove({_id: reviewId});
}