#!/usr/bin/perl

use strict;
use warnings;
use File::Basename;
use File::Spec;
use FindBin;
use Cwd;

# Gets system directories.
my $scriptsDir = $FindBin::Bin;
my $docsDir = Cwd::realpath($scriptsDir."/../../txt");
my $indexFilePath = $docsDir."/index.txt";

# Gets all documents.
my @docs = readDocs($docsDir);

# Output Environment js file.

open(my $fh, ">", $indexFilePath)
  or die "Cannot open $indexFilePath for write: $!";

print($fh "## List of Pages\n");
foreach my $doc (@docs) {
  # my $name = basename($doc);
  my $name = $doc;
  $name =~ s/^$docsDir//;



  print($fh "- [$name](#$name)\n");
}

print($fh "\nThis page was generated by engine/scripts/update_index.pl.\n");

close($fh);

sub readDocs {
  my $dir = shift;
  my @list = ();
  my @ret = ();

  opendir(DIR, $dir) or die("Can not open directory:$dir ($!)");
  @list = readdir(DIR);
  closedir(DIR);

  foreach my $file (sort @list){
    next if( $file =~ /^\..*$/ );

    if( -d "$dir/$file" ){
      push(@ret, readDocs("$dir/$file"));
    }
    else{
      push(@ret, "$dir/$file");
    }
  }

  return @ret;
}

