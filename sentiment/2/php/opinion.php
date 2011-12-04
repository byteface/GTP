<?php
class Opinion {
        private $index = array();
        private $classes = array('pos', 'neg');
        private $classTokCounts = array('pos' => 0, 'neg' => 0);
        private $tokCount = 0;
        private $classDocCounts = array('pos' => 0, 'neg' => 0);
        private $docCount = 0;
        private $prior = array('pos' => 0.5, 'neg' => 0.5);

        public function addToIndex($file, $class, $limit = 0) {
                $fh = fopen($file, 'r');
                $i = 0;
                if(!in_array($class, $this->classes)) {
                        echo "Invalid class specified\n";
                        return;
                }
                while($line = fgets($fh)) {
                        if($limit > 0 && $i > $limit) {
                                break;
                        }
                        $i++;
                        
                        $this->docCount++;
                        $this->classDocCounts[$class]++;
                        $tokens = $this->tokenise($line);
                        
                        foreach($tokens as $token) {
                        
//                        error_log( $token );
                        
                                if(!isset($this->index[$token][$class])) {
                                        $this->index[$token][$class] = 0;
                                }
                                $this->index[$token][$class]++;
                                $this->classTokCounts[$class]++;
                                $this->tokCount++;
                        }
                }
                fclose($fh);
        }
        
        public function classify($document) {
                $this->prior['pos'] = $this->classDocCounts['pos'] / $this->docCount;
                $this->prior['neg'] = $this->classDocCounts['neg'] / $this->docCount; 
                $tokens = $this->tokenise($document);
                $classScores = array();


                foreach($this->classes as $class) {
                        $classScores[$class] = 1;
                        foreach($tokens as $token) {
                                $count = isset($this->index[$token][$class]) ? 
                                        $this->index[$token][$class] : 0;



error_log($count);

                                $classScores[$class] *= ($count + 1) / 
                                        ($this->classTokCounts[$class] + $this->tokCount);
                        }
                        $classScores[$class] = $this->prior[$class] * $classScores[$class];
                }
                
                arsort($classScores);
                return key($classScores);
        }

        private function tokenise($document) {
                $document = strtolower($document);
                preg_match_all('/\w+/', $document, $matches);
                return $matches[0];
        }
}
?>