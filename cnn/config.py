# Data loading params
positive_data_file = "./data/rt-polaritydata/rt-polarity-5000.pos" # Positive data source
negative_data_file = "./data/rt-polaritydata/rt-polarity-5000.neg" # Negative data source
dev_sample_percentage = .1 #Percentage of the training data to use for validation
checkpoint_dir = "/home/zhanser1k/projects/front-end/tweetrainer/cnn/runs/models/checkpoints/" # Checkponts directory
# Model HyperParams
eval_train = False # Evaluate on whole dataset
embedding_dim = 128 # Dimensionality of character embedding
filter_sizes = "3,4,5" #Comma-separated filter sizes
num_filters = 128 # Number of filters per filter size
dropout_keep_prob = 0.5 # Dropout keep probability
l2_reg_lambda = 0.0 # L2 reguralization lambda
# Training params
batch_size = 128 # batch size
num_epochs = 11 # Number of training epochs
evaluate_every = 50 # Evaluate model on dev set after this many steps
checkpoint_every = 50 # Save model after this many steps
num_checkpoints = 1 # Number of checkpoints to store
# Misc params
allow_soft_placement = True #Allow device soft placement
log_device_placement = False # Log placement of ps on devices
