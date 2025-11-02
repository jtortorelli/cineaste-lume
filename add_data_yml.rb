#!/usr/bin/env ruby
# frozen_string_literal: true

# Script to add _data.yml to each 'posters' directory in /static/images/films subdirectories.
# Requires Ruby 2.3+ (uses File/Dir for paths).
# Run with: ruby add_data_yml.rb

# Base directory
base_dir = 'src/static/images/tv-series'

# YAML content
yaml_content = <<~YAML
  transformImages:
    format: webp
    resize: [270]
YAML

# Traverse film directories
Dir.foreach(base_dir) do |tv_series|
  next if tv_series == '.' || tv_series == '..'

  tv_series_dir = File.join(base_dir, tv_series)
  next unless File.directory?(tv_series_dir)

  title_card_dir = File.join(tv_series_dir, 'title-cards')
  unless Dir.exist?(title_card_dir)
    puts "No 'title-cards' directory found in #{tv_series_dir}"
    next
  end

  data_file = File.join(title_card_dir, '_data.yml')
  if File.exist?(data_file)
    puts "_data.yml already exists in #{title_card_dir}"
  else
    # Write the file
    File.write(data_file, yaml_content, encoding: 'UTF-8')
    puts "Added _data.yml to #{title_card_dir}"
  end
end

puts 'Done!'