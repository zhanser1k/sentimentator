#! /usr/bin/env python

import tensorflow as tf
import numpy as np
import os
import time
import datetime
import data_helpers
from text_cnn import TextCNN
from tensorflow.contrib import learn
import csv
import argparse
import config


# Argument parser
parser = argparse.ArgumentParser(description='Load parameters')
parser.add_argument('--sentence','-s', metavar='text', type=str, default='',
                    help='input sentence for evaluate model')
parser.add_argument('--checkpoint_dir', '-cd', metavar='checkpoint directory', type=str,
                    default=config.checkpoint_dir, help='checkpoint_dir for restore model')

options = vars(parser.parse_args())
x_raw = [options['sentence'] ]
y_test = [1]

# Map data into vocabulary
vocab_path = os.path.join(config.checkpoint_dir, "..", "vocab")
vocab_processor = learn.preprocessing.VocabularyProcessor.restore(vocab_path)
x_test = np.array(list(vocab_processor.transform(x_raw)))

# Evaluation
# ==================================================
checkpoint_file = tf.train.latest_checkpoint(config.checkpoint_dir)
graph = tf.Graph()
with graph.as_default():
    session_conf = tf.ConfigProto(
      allow_soft_placement=config.allow_soft_placement,
      log_device_placement=config.log_device_placement)
    sess = tf.Session(config=session_conf)
    with sess.as_default():
        # Load the saved meta graph and restore variables
        saver = tf.train.import_meta_graph("{}.meta".format(checkpoint_file))
        saver.restore(sess, checkpoint_file)

        # Get the placeholders from the graph by name
        input_x = graph.get_operation_by_name("input_x").outputs[0]
        # input_y = graph.get_operation_by_name("input_y").outputs[0]
        dropout_keep_prob = graph.get_operation_by_name("dropout_keep_prob").outputs[0]

        # Tensors we want to evaluate
        predictions = graph.get_operation_by_name("output/predictions").outputs[0]

        # Generate batches for one epoch
        batches = data_helpers.batch_iter(list(x_test), config.batch_size, 1, shuffle=False)

        for x_test_batch in batches:
            batch_predictions = sess.run(predictions, {input_x: x_test_batch, dropout_keep_prob: 1.0})
# Print accuracy if y_test is defined

if (batch_predictions == 0.0):
    print("negative")
else:
    print("positive")