#!/usr/bin/env ruby

require 'fileutils'
require 'pathname'

# Define paths
source_dir = 'src/static/images/films'
target_dir = File.join(source_dir, 'posters')

puts target_dir

# Create target dir if needed
FileUtils.mkdir_p(target_dir)

# Iterate over each film slug directory
Dir.glob(File.join(source_dir, '*/')).each do |film_dir_path|
  film_dir = Pathname.new(film_dir_path)
  posters_dir = film_dir.join('posters')

  # Skip if no posters subdir
  next unless posters_dir.directory?

  # Get film slug (basename of the film dir)
  film_slug = film_dir.basename.to_s

  # Find the poster file (case-insensitive match for poster.*)
  poster_files = Dir.glob(posters_dir.join('poster.*'), File::FNM_CASEFOLD)
  
  # Skip if no poster file found
  next if poster_files.empty?

  # Take the first (should be only one)
  poster_file = poster_files.first
  ext = File.extname(poster_file)

  # Define target path: [film-slug].[ext]
  target_file = File.join(target_dir, "#{film_slug}#{ext}")

  # Move the file
  FileUtils.mv(poster_file, target_file)
  puts "Moved #{poster_file} to #{target_file}"
end

puts "Reorganization complete. Check static/images/films/posters/ for the new files."