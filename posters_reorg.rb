#!/usr/bin/env ruby

require 'fileutils'
require 'pathname'

# Define paths
source_dir = 'src/static/images/tv-series'
target_dir = File.join(source_dir, 'title-cards')

puts target_dir

# Create target dir if needed
FileUtils.mkdir_p(target_dir)

# Iterate over each film slug directory
Dir.glob(File.join(source_dir, '*/')).each do |tv_series_dir_path|
  tv_series_dir = Pathname.new(tv_series_dir_path)
  title_cards_dir = tv_series_dir.join('title-cards')

  # Skip if no title-cards subdir
  next unless title_cards_dir.directory?

  # Get film slug (basename of the film dir)
  tv_series_slug = tv_series_dir.basename.to_s

  # Find the title card file (case-insensitive match for title-card.*)
  title_card_files = Dir.glob(title_cards_dir.join('title-card.*'), File::FNM_CASEFOLD)
  
  # Skip if no title card file found
  next if title_card_files.empty?
  # Take the first (should be only one)
  title_card_file = title_card_files.first
  ext = File.extname(title_card_file)

  # Define target path: [tv-series-slug].[ext]
  target_file = File.join(target_dir, "#{tv_series_slug}#{ext}")

  # Move the file
  FileUtils.mv(title_card_file, target_file)
  puts "Moved #{title_card_file} to #{target_file}"
end

puts "Reorganization complete. Check static/images/tv-series/title-cards/ for the new files."