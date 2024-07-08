#!/usr/bin/zsh 

echo "What is the title?" 
read TITLE
TITLE_CLEAN=$(echo "$TITLE" | tr -cd '[:alnum:][:space:]' | sed 's/ /-/g')

FILEMIGHTEXIST=$(ls _posts/*$TITLE_CLEAN*) 

if [ -z  $FILEMIGHTEXIST ] ; then
  echo "No files found with the same name"
else
  echo "Is the file you want to create one of these?"
  #echo $FILEMIGHTEXIST
  i=0
  for fn in $( echo "$FILEMIGHTEXIST" ); do
    (( i = $i + 1 ))
    echo "($i)\t$fn"
  done
  while [ TRUE ] ; do
    echo "Press 1-$i to open the file, press 0 or Enter/Return to create a new file"
    read FILEINDEX
    if [[ $FILEINDEX -ge 1 ]] && [[ $FILEINDEX -le $i ]] ; then
      echo $FILEMIGHTEXIST | awk -v NFILE=$FILEINDEX 'NR==NFILE {print $0}'
      exit 1
    elif [[ "$FILEINDEX" == "0" ]] || [[ "$FILEINDEX" == "" ]] ; then 
      echo "Creating a new file"
      break
    else 
      echo "Wrong input!"
      continue
    fi
  done
fi

echo "What is the date and time to publish the post? (YYYY-MM-DD HH:MM)" 
read DATEINPUT
NOW=$(date --iso-8601=seconds 2> /dev/null)
TIMESTAMPNOW=$(date -d $NOW "+%s" 2> /dev/null) 
while [ -z $TIMESTAMP ] ; do
  TIMESTAMP=$(date -d $DATEINPUT "+%s" 2> /dev/null )
  if [  -z $TIMESTAMP ]; then
    echo "Date format is wrong or no date set!"
    while [ TRUE ] ; do
      echo "Do you want to use the current date ($NOW)? (Y/n)" 
      read CONFIRM 
      case $CONFIRM in
	Y | y | "")
	  TIMESTAMP=$TIMESTAMPNOW 
	  break
	  ;;
	N | n )
	  echo "What is the date and time to publish the post? (YYYY-MM-DD HH:MM)" 
	  read DATEINPUT 
          TIMESTAMP=`date -d $DATEINPUT +%s`
          break
          ;;
	*)
          echo "Wrong selection try again"
          continue
          ;;
      esac
    done
  fi
  if [ ! -z $TIMESTAMP  ] ; then
    echo "$TIMESTAMP"
    DATE=$(date -d \@$TIMESTAMP --iso-8601=seconds 2> /dev/null )
    echo "The date will be set to:"
    echo "\"date: $DATE\""
    while [ TRUE ] ;do
    echo "Is it correct? (Y/n)" 
    read CONFIRM
      case $CONFIRM in 
	Y | y | "") 
	  break
          ;;
        N | n )
          TIMESTAMP=""
	  break
          ;;
        * ) 
	  echo "Wrong selection try again"
          continue
          ;;
      esac
    done
  fi
done

DATE=$(date -d \@$TIMESTAMP --iso-8601=seconds 2> /dev/null)
DATEYMD=$(date -d $DATE "+%Y-%m-%d")
FILENAME=$DATEYMD"-"$TITLE_CLEAN".md"
FILE="_posts/"$FILENAME

echo $DATEYMD
echo $TITLE_CLEAN
echo $FILENAME

if [ -f $FILE ] ; then
  echo "The filename $FILENAME exists! Choose a different day or name. Rerun the script"
  exit 0
else
  echo "---" 			>> $FILE
  echo "title: \"$TITLE\"" 	>> $FILE
  echo "date: $DATE" 		>> $FILE
  echo "categories:" 		>> $FILE
  echo "  -" 			>> $FILE
  echo "tags:" 			>> $FILE
  echo "  -" 			>> $FILE
  echo "---" 			>> $FILE
  echo ""
  echo ""
  echo "Done!"
  echo ""
  echo "Run: vim $FILE"
fi

